import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import MemoItem from "./MemoItem";
import "./Main.css";
import {
  addMemoAsync,
  getMemoListAsync,
  mainActions,
  Memo,
} from "../store/main-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../store";

const MemoList = () => {
  const dataId = useRef(4);

  const mainItems = [
    {
      user: "",
      id: 2,
      title: "JAPAN🍜",
      date: "MAY 25 ~ MAY 28",
      description: "셤끝나고 일본 여행",
      color: 2,
    },
  ];
  const dispatch = useDispatch<any>();

  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.user.userInfo,
  }));
  const memoData = useSelector((state: any) => ({
    memoData: state.main.memoData,
  }));

  let defaultData: Memo = {
    user: userInfo.email,
    noteId: dataId.current,
    noteName: "메모장 이름",
    setDate: "지정 날짜",
    noteDescription: "메모장 소개",
    noteColor: 0,
  };

  useEffect(() => {
    defaultData.user = userInfo.email;
    console.log(memoData.memoData);
  }, [userInfo, memoData.memoData]);

  const addItemHandler = () => {
    // dispatch(
    //   mainActions.addItemToMain({
    //     user: "",
    //     id: dataId.current,
    //     title: "메모장 이름",
    //     date: "지정 날짜",
    //     description: "메모장 소개",
    //     color: 0,
    //   })
    // );
    console.log(defaultData);
    dispatch(addMemoAsync(defaultData));
    dataId.current += 1;
  };

  return (
    <div className="main-memolist">
      {memoData &&
        memoData.memoData.map((item: Memo, index: number) => (
          <div key={index}>
            <MemoItem {...item} />
          </div>
        ))}

      <div className="main-memo" onClick={addItemHandler}>
        <FontAwesomeIcon icon={faPlus} className="plus-icon" />
      </div>
    </div>
  );
};
export default MemoList;
