import {
  faCalendarDays,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../CommonPage/SideBar/SideBar";
import "./Main.css";
import MemoList from "./MemoList";
import TodoContainer from "./TodoList/TodoContainer";

const Main = () => {
  const navigate = useNavigate();

  const [addTodo, setAddTodo] = useState(false);
  const [addCalender, setAddCalender] = useState(false);

  const tutorialGo = () => {
    navigate("/");
  };
  return (
    <div className="main">
      <SideBar />
      <div className="main-container">
        <h1 className="main-title" onClick={tutorialGo}>
          DA : HAENG
        </h1>
        <MemoList />
      </div>
      <div className="RightSide">
        <div className="openTodo">
          <FontAwesomeIcon
            icon={faClipboardList}
            onClick={() => setAddTodo(!addTodo)}
            className="todoicon"
          />
        </div>
        {addTodo && <TodoContainer />}
        <div className="openTodo">
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="todoicon"
            onClick={() => setAddCalender(!addCalender)}
          />
        </div>
        {/* {addCalender && <Calender />} */}
      </div>
    </div>
  );
};
export default Main;
