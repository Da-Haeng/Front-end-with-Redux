import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import MemoItem from "./MemoItem";
import "./Main.css";
import { mainActions } from "../store/main-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../store";

const MemoList = () => {
  const dataId = useRef(4);
  const mainItems = useSelector((state: RootState) => state.main.items);
  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(
      mainActions.addItemToMain({
        id: dataId.current,
        title: "메모장 이름",
        date: "지정 날짜",
        description: "메모장 소개",
        color: 0,
      })
    );
    dataId.current += 1;
  };

  return (
    <div className="main-memolist">
      {mainItems &&
        mainItems.map((item) => (
          <div key={item.id}>
            <MemoItem
              {...item}
            />
          </div>
        ))}

      <div className="main-memo" onClick={addItemHandler}>
        <FontAwesomeIcon icon={faPlus} className="plus-icon" />
      </div>
    </div>
  );
};
export default MemoList;
