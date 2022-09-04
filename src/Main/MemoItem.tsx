import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { mainActions, Memo } from "../store/main-slice";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./Main.css";

const MemoItem = (props: Memo) => {
  const dispatch = useDispatch();
  const { id, title, description, date, color } = props;

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newColor, setNewColor] = useState(color);
  const [newDate, setNewDate] = useState(date);

  useEffect(() => {}, [props]);

  const removeItemHandler = (event: any) => {
    dispatch(mainActions.removeItemToMain({ id: id }));
    event.stopPropagation();
    alert("삭제되었습니다.");
  };

  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/detail/${id}`);
  };

  const [isEdit, setEdit] = useState(false);
  const [isColor, setColor] = useState(false);

  const editHandler = (event: any) => {
    setEdit(!isEdit);
    dispatch(
      mainActions.editItemToMain({
        id,
        title: newTitle,
        description: newDescription,
        color: newColor,
        date: newDate,
      })
    );
    event.stopPropagation();
  };

  const toggleEditHandler = (event: any) => {
    setEdit(!isEdit);
    event.stopPropagation();
  };

  const handleColor = (e: any, color: any) => {
    setNewColor(color);
    dispatch(
      mainActions.editItemToMain({
        id,
        title: newTitle,
        description: newDescription,
        color: newColor,
        date: newDate,
      })
    );
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
              value={title}
              readOnly
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
            onChange={(e) => setNewDate(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <input
            type="text"
            className="main-memointro"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : (
        <div className="main-memocontext">
          <input type="text" className="main-memodate" value={date} readOnly />
          <input
            type="text"
            className="main-memointro"
            value={description}
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
