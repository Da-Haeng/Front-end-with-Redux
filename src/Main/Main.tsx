import {
  faCalendarDays,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../CommonPage/SideBar/SideBar";
import { getMemoListAsync } from "../store/main-slice";
import "./Main.css";
import MemoList from "./MemoList";
import TodoContainer from "./TodoList/TodoContainer";

const Main = () => {
  const navigate = useNavigate();

  const tutorialGo = () => {
    navigate("/");
  };

  const dispatch = useDispatch<any>();
  const [addTodo, setAddTodo] = useState(false);
  const [addCalender, setAddCalender] = useState(false);

  const { memoData } = useSelector((state: any) => ({
    memoData: state.main.memoData,
  }));

  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user.userInfo,
  }));
  useEffect(() => {
    dispatch(getMemoListAsync(userInfo.email));
  }, [userInfo]);

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
