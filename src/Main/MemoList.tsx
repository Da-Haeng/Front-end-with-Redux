import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import MemoItem from "./MemoItem";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import {
  addMemoAsync,
  getMemoListAsync,
  mainActions,
  Memo,
} from "../store/main-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faPlus } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../store";
import { useMemo } from "react";

const MemoList = () => {
  const dataId = useRef(4);
  const navigate = useNavigate();

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

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    defaultData.user = userInfo.email;
    dispatch(getMemoListAsync(userInfo.email));
  }, [userInfo, update]);

  const addItemHandler = async () => {
    await dispatch(addMemoAsync(defaultData));
    setUpdate(!update);
    dataId.current += 1;
  };

  console.log(memoData);

  let defaultData: Memo = {
    user: userInfo.email,
    noteId: dataId.current,
    noteName: "",
    setDate: "",
    noteDescription: "",
    noteColor: 0,
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
export default React.memo(MemoList);
