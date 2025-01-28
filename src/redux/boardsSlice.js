import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiInstance } from "../api/ItmoBebrikiService.js";
import '../api/types/Boards/boards.js';
import '../api/types/Topics/topics.js';
import '../api/types/Tasks/tasks.js';

async function loadBoards() {
  try {
    const boardsResponse = await apiInstance.getBoards({});
    const boards = boardsResponse.boards;

    const processedBoards = await Promise.all(
      boards.map(async (boardDto) => {
        const topics = await Promise.all(
          boardDto.topicIds.map(async (topicId) => {
            const topicResponse = await apiInstance.getTopics({ topicIds: [topicId] });
            const topicDto = topicResponse.topics;

            const tasks = await Promise.all(
              topicDto.taskIds.map(async (taskId) => {
                const taskResponse = await apiInstance.getTasks([taskId]);
                const taskDto = taskResponse.jobTasks;

                return {
                  title: taskDto.title,
                  description: taskDto.description,
                  assigneeId: taskDto.assigneeId,
                  subtasks: taskDto.dependOnJobTaskIds,
                  status: taskDto.jobTaskState,
                  isAgreed: taskDto.isAgreed,
                };
              })
            );

            return {
              name: topicDto.name,
              topicId: topicDto.id,
              tasks: tasks,
            };
          })
        );

        return {
          name: boardDto.name,
          boardId: boardDto.id,
          columns: topics,
        };
      })
    );

    return processedBoards;
  } catch (error) {
    console.error("Error loading boards:", error);
    throw error;
  }
}

const add = await (async (state, action) => {
  if (state) {
  const isActive = state.length > 0 ? false : true;
  const payload = action.payload;
  const board = {
    name: payload.name,
    isActive,
    columns: [],
  };
  let topicIds = [];
  let topicsData = [];
  for (let topic of payload.newColumns) {
    let result = await apiInstance.createTopic({name: topic.name, description: topic.name, taskIds: []});
    topicIds.push(result.id);
    topic.topicId = result.id;
    topicsData.push(topic);
  }
  board.boardId = await apiInstance.createBoard({name: payload.name, description: payload.name, topicIds: topicIds}).id;
  board.columns = payload.newColumns;
  state.push(topicsData);
}})();

const editBoard = createAsyncThunk('boards/editBoard',
  async (board, name, newColumns) => {
    await apiInstance.updateBoard(board.boardId, {name: name, description: name});
    board.name = name;
    let newTopic = newColumns[-1];
    if (newTopic) {
      console.log(newColumns);
      let topicId = await apiInstance.createTopic({name: newTopic.name, description: newTopic.name, taskIds: []});
      newColumns[-1].topicId = topicId;
      await apiInstance.addBoardTopics(board.boardId, [topicId]);
      board.columns = newColumns;
    }
  }
);

export const addBoardTopics = createAsyncThunk('boards/addBoardTopics',
  async (boardId, topicIds) => {
    try {
      await apiInstance.addBoardTopics(boardId, topicIds);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

const createTopic = async (topic) => {
  return await apiInstance.createTopic(topic).id
}

export const boardsSlice = createSlice({
  name: "boards",
  initialState: await loadBoards(),
  extraReducers: (builder) => {
    builder
      .addCase(addBoardTopics.fulfilled, () => {})
      .addCase(editBoard.fulfilled, () => {})
  },
  reducers: {
    createTopic: (topic) => {
      return createTopic(topic);
    },
    addBoard: (state, action) => {
      add(state, action);
    },
    deleteTopicFromBoard: (_, action) => {
      const payload = action.payload;
      (async () => await apiInstance.removeBoardTopics(payload.boardId, [payload.topicId]))();
    },
    updateTopic: (_, action) => {
      const payload = action.payload;
      (async () => await apiInstance.updateTopic(payload.topicId, {topicName: payload.topicName, topicDescription: payload.topicDescription}))();
    },
    deleteBoard: (state) => {
      state.find((board) => board.isActive);
      // const board = state.find((board) => board.isActive);
      // state.splice(state.indexOf(board), 1);
    },
    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index === action.payload.index
          ? (board.isActive = true)
          : (board.isActive = false);
        return board;
      });
    },
    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } =
        action.payload;
      const task = { title, description, subtasks, status };
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === newColIndex);
      column.tasks.push(task);
    },
    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === prevColIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);
      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;
      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
      const newCol = board.columns.find((col, index) => index === newColIndex);
      newCol.tasks.push(task);
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      const prevCol = board.columns.find((col, i) => i === prevColIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      board.columns.find((col, i) => i === colIndex).tasks.push(task);
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasks.push(task);
    },
    deleteTask: (state, action) => {
      action.payload;
      state.find((board) => board.isActive);
      // const payload = action.payload;
      // const board = state.find((board) => board.isActive);
      // const col = board.columns.find((col, i) => i === payload.colIndex);
      // col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
    },
  },
});

export default boardsSlice;
