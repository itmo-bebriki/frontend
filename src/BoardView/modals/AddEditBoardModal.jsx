import { useState } from "react";
import PropTypes from "prop-types";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../../redux/boardsSlice";
// import addBoardTopics from "../../redux/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import '../../api/types/Boards/boards';
import '../../api/types/Topics/topics';
import '../../api/types/Tasks/tasks';


function AddEditBoardModal({ setIsBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([]);
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const onChange = (id, newValue) => {
    console.log(id, newValue);
    if (id && newValue) {
      let topicId = boardsSlice.actions.createTopic({name: newValue, description: newValue}).id;
      setNewColumns((prevState) => {
        const newState = [...prevState];
        const column = newState.find((col) => col.id === id);
        console.log(board, id, newValue);

        column.topicId = topicId;
        column.name = newValue;
        return newState;
      });
      // addBoardTopics(board.boardId, [topicId]);
    }
  };

  // const onChange = (id, newValue) => {
  //   console.log(id, newValue);
  //   if (id && newValue) {
  //     // let topicId = await apiInstance.createTopic({name: newValue, description: newValue}).id
  //     setNewColumns((prevState) => {
  //       const newState = [...prevState];
  //       const column = newState.find((col) => col.id === id);
  //       console.log(board, id, newValue);

  //       // column.topicId = topicId;
  //       column.name = newValue;
  //       return newState;
  //     });
  //     // await (async () => await apiInstance.addBoardTopics(board.boardId, [topicId]))();
  //   }
  // };

  const onDelete = (id) => {
    let boardId = board.boardId;
    let topicId = board.columns.find((el) => el.id === id).topicId;

    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
    boardsSlice.actions.deleteTopicFromBoard({ boardId, topicId})
  };

  const onSubmit = (type) => {
    setIsBoardModalOpen(false);
    if (type === "add") {
      console.log('adding');
      dispatch(boardsSlice.caseReducers.addBoard({ board, name, newColumns }));
    } else {
      dispatch(boardsSlice.caseReducers.editBoard({ board, name, newColumns }));
    }
  };

  AddEditBoardModal.propTypes = {
    setIsBoardModalOpen: PropTypes.func.isRequired, // Example of a required function prop
    type: PropTypes.string.isRequired, // Example of a required string prop
  };

  return (
    <div
      className="  fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
    >
      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Board Name
          </label>
          <input
            className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        {/* Board Columns */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className=" text-sm dark:text-white text-gray-500">
            Board Columns
          </label>

          {newColumns.map((column, index) => (
            <div key={index} className=" flex items-center w-full ">
              <input
                className=" bg-transparent flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                type="text"
                value={column.name}
              />
              <img
                src={crossIcon}
                onClick={() => {
                  onDelete(column.id);
                }}
                className=" m-4 cursor-pointer "
              />
            </div>
          ))}
          <div>
            <button
              className=" w-full items-center hover:opacity-70 dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4()},
                ]);
              }}
            >
              + Add New Column
            </button>
            <button
              onClick={() => {
                onSubmit(type);
              }}
              className=" w-full items-center hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full"
            >
              {type === "add" ? "Create New Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
