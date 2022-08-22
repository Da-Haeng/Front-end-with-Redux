import { faCalendarDays, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SideBar from "../CommonPage/SideBar/SideBar";
import "./Main.css";
import MemoList from "./MemoList";
import TodoContainer from "./TodoList/TodoContainer";

const Main = () => {
  const [addTodo, setAddTodo] = useState(false);
  return (
    <div className="main">
      <SideBar />
      <div className="main-container">
        <h1 className="main-title">DA : HAENG</h1>
        <MemoList />
      </div>
      <div className="RightSide">
        <div className="openTodo">
          <FontAwesomeIcon
            icon={faClipboardList}
            onClick={() => setAddTodo(!addTodo)}
          />
        </div>
        {addTodo && <TodoContainer />}
        <div className="openTodo">
          <FontAwesomeIcon icon={faCalendarDays} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
export default Main;
