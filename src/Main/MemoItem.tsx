import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  removeMemoAsync,
  editMemoAsync,
  editMemoColorAsync,
  getMemoListAsync,
} from "../store/main-slice";
import { memberShareAsync } from "../store/user-slice";

import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { getCategoryListAsync } from "../store/category-slice";
import moment from "moment";
import Swal from "sweetalert2";

const MemoItem = (props: any) => {
  const dispatch = useDispatch<any>();
  // const { id, title, description, date, color } = props;

  const [newTitle, setNewTitle] = useState(props.noteName);
  const [newDescription, setNewDescription] = useState(props.noteDescription);
  const [newColor, setNewColor] = useState(props.noteColor);
  //const [update, setUpdate] = useState(false);
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date(props.startDate));
  const [endDate, setEndDate] = useState(new Date(props.endDate));

  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user.userInfo,
  }));

  const memoData = useSelector((state: any) => ({
    memoData: state.main.memoData,
  }));

  const removeItemHandler = async (event: any) => {
    event.stopPropagation();
    await dispatch(
      removeMemoAsync({ memoId: props.noteId, email: userInfo.email })
    );
    // setUpdate(!update);
  };

  const categoryItems: Document = useSelector(
    (state: any) => state.category.document
  );

  const navigate = useNavigate();
  const goDetail = async () => {
    await dispatch(getCategoryListAsync(props.noteId));
    localStorage.setItem("noteId", props.noteId);
    navigate(`/detail/${props.noteId}`, { state: props });
    // navigate("/detail");
  };

  const [isEdit, setEdit] = useState(false);
  const [isColor, setColor] = useState(false);

  const editHandler = async (event: any) => {
    setEdit(!isEdit);
    event.stopPropagation();
    await dispatch(
      editMemoAsync({
        noteId: props.noteId,
        noteName: newTitle,
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
        noteDescription: newDescription,
        noteColor: newColor,
      })
    );
    Swal.fire({
      icon: "success",
      text: "수정되었습니다.",
      width: 400,
    });
    // setUpdate(!update);
  };

  const toggleEditHandler = (event: any) => {
    setEdit(!isEdit);
    event.stopPropagation();
  };

  const handleColor = (e: any, color: any) => {
    setNewColor(color);
    setColor(!isColor);
    e.stopPropagation();
    console.log(newColor);
    dispatch(
      editMemoColorAsync({
        noteId: props.noteId,
        noteColor: newColor,
      })
    );
    // setUpdate(!update);
  };

  const handleToggleColor = (e: any) => {
    setColor(!isColor);
    e.stopPropagation();
  };

  return (
    <div
      className="main-memo"
      onClick={goDetail}
      style={{ backgroundColor: props.noteColor }}
    >
      <div className="main-memotitle">
        {isEdit ? (
          <div className="main-memotitle-left">
            <input
              type="text"
              className="main-memotitle_input"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
              placeholder="메모장 이름"
              onClick={(e) => e.stopPropagation()}
            />
            <FontAwesomeIcon
              icon={faPencil}
              className={["pencil-icon", `pencil-icon-${isEdit}`].join(" ")}
              onClick={editHandler}
            />
          </div>
        ) : (
          <div className="main-memotitle-left">
            <input
              type="text"
              className="main-memotitle_input"
              value={props.noteName}
              readOnly
              placeholder="메모장 이름"
            />
            <FontAwesomeIcon
              icon={faPencil}
              className={["pencil-icon", `pencil-icon-${isEdit}`].join(" ")}
              onClick={toggleEditHandler}
            />
          </div>
        )}

        <div
          className={[
            "main-memotitle-right",
            `main-memotitle-right-${newColor}`,
          ].join(" ")}
        >
          {/* {isColor ? (
            <div className="main-memotitle-colorwidget">
              <div
                className="main-memotitle-color-1"
                onClick={(e) => handleColor(e, 1)}
              ></div>
              <div
                className="main-memotitle-color-2"
                onClick={(e) => handleColor(e, 2)}
              ></div>
              <div
                className="main-memotitle-color-3"
                onClick={(e) => handleColor(e, 3)}
              ></div>
              <div
                className="main-memotitle-color-4"
                onClick={(e) => handleColor(e, 4)}
              ></div>
            </div>
          ) : (
            <></>
          )} */}
        </div>
      </div>

      {isEdit ? (
        <div className="main-memocontext">
          <div
            className="custom-react-datepicker__wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              locale={ko}
              dateFormat="yyyy/MM/dd"
            />
            <span className="datePickSpan">~</span>
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              locale={ko}
              dateFormat="yyyy/MM/dd"
            />
          </div>

          <input
            type="text"
            className="main-memointro"
            value={newDescription}
            placeholder="메모장 소개"
            onChange={(e) => setNewDescription(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : (
        <div className="main-memocontext">
          {/* <div className="dateDiv">
            <input
              type="text"
              className="main-memodate"
              value={newDate}
              placeholder="지정 날짜"
              onChange={(e) => setNewDate(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              readOnly
            />
            <span className="datePickSpan">~</span>
            <input
              type="text"
              className="main-memodate"
              value={newDate}
              placeholder="지정 날짜"
              onChange={(e) => setNewDate(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              readOnly
            />
          </div> */}
          <div
            className="custom-react-datepicker__wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              locale={ko}
              dateFormat="yyyy/MM/dd"
              readOnly
            />
            <span className="datePickSpan">~</span>
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              locale={ko}
              dateFormat="yyyy/MM/dd"
              readOnly
            />
          </div>

          <input
            type="text"
            className="main-memointro"
            value={props.noteDescription}
            placeholder="메모장 소개"
            readOnly
          />
        </div>
      )}

      <div className="main-memobottom">
        <div>
          <FontAwesomeIcon
            icon={faTrash}
            className="trash-icon"
            onClick={removeItemHandler}
          />
        </div>

        {/* <div className="main-memomember">{MemberList}</div> */}
      </div>
    </div>
  );
};
export default MemoItem;
