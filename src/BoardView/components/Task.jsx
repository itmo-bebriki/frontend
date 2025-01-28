import { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";
import { PropTypes } from "prop-types";
import { apiInstance } from "../../api/ItmoBebrikiService";

function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((_, i) => i === colIndex);
  const task = col.tasks.find((_, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if ((async () => await apiInstance.getTasks({jobTaskIds: [subtask]}))().jobTasks[0].isAgreed) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
      >
        <p className=" font-bold tracking-wide ">{task.title}</p>
        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} of {subtasks.length} completed subtasks
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

Task.propTypes = {
  colIndex: PropTypes.number.isRequired, // Example of a required number prop
  taskIndex: PropTypes.number.isRequired, // Example of a required number prop
};

export default Task;
