import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  mainActions,
  Memo,
  removeMemoAsync,
  editMemoAsync,
  getMemoListAsync,
} from "../store/main-slice";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./Main.css";

const MemoItem = (props: any) => {
  const dispatch = useDispatch<any>();
  // const { id, title, description, date, color } = props;

  const [newTitle, setNewTitle] = useState(props.noteName);
  const [newDescription, setNewDescription] = useState(props.noteDescription);
  const [newColor, setNewColor] = useState(props.noteColor);
  const [newDate, setNewDate] = useState(props.setDate);

  const [update, setUpdate] = useState(false);

  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user.userInfo,
  }));

  console.log(props);

  useEffect(() => {
    dispatch(getMemoListAsync(userInfo.email));
  }, [userInfo, update]);

  const removeItemHandler = async (event: any) => {
    event.stopPropagation();
    await dispatch(
      removeMemoAsync({ memoId: props.noteId, email: userInfo.email })
    );
    setUpdate(!update);
  };

  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/detail/${props.noteId}`);
  };

  const [isEdit, setEdit] = useState(false);
  const [isColor, setColor] = useState(false);

  const editHandler = async (event: any) => {
    setEdit(!isEdit);
    // dispatch(
    //   mainActions.editItemToMain({
    //     user: "",
    //     id,
    //     title: newTitle,
    //     description: newDescription,
    //     color: newColor,
    //     date: newDate,
    //   })
    // );
    event.stopPropagation();
    await dispatch(
      editMemoAsync({
        noteId: props.noteId,
        noteName: newTitle,
        setDate: newDate,
        noteDescription: newDescription,
        noteColor: newColor,
      })
    );
    setUpdate(!update);
  };

  const toggleEditHandler = (event: any) => {
    setEdit(!isEdit);
    event.stopPropagation();
  };

  const handleColor = (e: any, color: any) => {
    setNewColor(color);
    setColor(!isColor);
    e.stopPropagation();
  };

  const handleToggleColor = (e: any) => {
    setColor(!isColor);
    e.stopPropagation();
  };

  return (
    <div className="main-memo" onClick={goDetail}>
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
          onClick={handleToggleColor}
        >
          {isColor ? (
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
          )}
        </div>
      </div>

      {isEdit ? (
        <div className="main-memocontext">
          <input
            type="text"
            className="main-memodate"
            value={newDate}
            placeholder="지정 날짜"
            onChange={(e) => setNewDate(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
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
          <input
            type="text"
            className="main-memodate"
            value={props.setDate}
            placeholder="지정 날짜"
            readOnly
          />
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

        <div className="main-memomember">
          {/* <span>융</span>
                <span>다</span>
                <span>슬</span>
                <span>지</span> */}
        </div>
      </div>
    </div>
  );
};
export default MemoItem;
