import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../CommonPage/SideBar/SideBar";
import DetailHeader from "./DetailHeader";
import Category from "./Category";
import "./Detail.css";
import { RootState } from "../store";
import { Memo, MemosState } from "../store/main-slice";
import { getCellListAsync } from "../store/category-slice";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<any>();

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
          {/* <div>
            {mainItems && <span>{detailItems.startDate.toString()}</span>}
            {mainItems && <span>{detailItems.endDate.toString()}</span>}
          </div> */}
        </div>
        <div className="memo-category">
          <Category noteId={parseInt(id!)} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
