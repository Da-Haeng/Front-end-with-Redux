import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../CommonPage/SideBar/SideBar";
import DetailHeader from "./DetailHeader";
import Category from "./Category";
import "./Detail.css";
import { RootState } from "../store";
import { Memo, MemosState } from "../store/main-slice";

const Detail = () => {
  const { id } = useParams();

  const mainItems: MemosState = useSelector(
    (state: RootState) => state.main.memoData
  );

  const detailItems = mainItems.find((it) => it.noteId === parseInt(id!))!;
  console.log(detailItems);
  const navigate = useNavigate();

  return (
    <div className="DetailPage">
      <div className="side-memu">
        <SideBar />
      </div>
      <div className="memo-container">
        <div className="memo-header">
          {mainItems && <DetailHeader title={detailItems.noteName} />}
        </div>
        <div className="memo-content">
          {mainItems && <h1>{detailItems.noteName}</h1>}
          {mainItems && <span>{detailItems.setDate}</span>}
        </div>
        <div className="memo-category">
          <Category mainId={1} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
