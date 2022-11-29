import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../CommonPage/SideBar/SideBar";
import DetailHeader from "./DetailHeader";
import Category from "./Category";
import "./Detail.css";
import { RootState } from "../store";
import { Memo, MemosState, getMemoListAsync } from "../store/main-slice";
import {
  getCellListAsync,
  getCategoryListAsync,
} from "../store/category-slice";
import moment from "moment";

interface RouteState {
  lastUpdate: Date;
  noteId: number;
  noteName: string;
  startDate: Date;
  endDate: Date;
  noteDescription: string;
  noteColor: number;
}

const Detail = () => {
  const { state } = useLocation();

  // const { id } = useParams();
  const id = localStorage.getItem("noteId");
  const dispatch = useDispatch<any>();
  const localEmail = localStorage.getItem("email")!;

  const getCategoryHandler = async () => {
    await dispatch(getCategoryListAsync(parseInt(id!)));
  };

  useEffect(() => {
    getCategoryHandler();
  }, []);

  // const mainItems: MemosState = useSelector(
  //   (state: RootState) => state.main.memoData
  // );

  const mainItems = state as RouteState;

  // const detailItems = mainItems.find((it) => it.noteId === parseInt(id!))!;
  const navigate = useNavigate();

  const categoryItems: Document = useSelector(
    (state: any) => state.category.document
  );

  if (!mainItems && !categoryItems) {
    return <div>hi</div>;
  }
  return (
    <>
      {mainItems && categoryItems && (
        <div className="DetailPage">
          <div className="side-memu">
            <SideBar />
          </div>
          <div className="memo-container">
            <div className="memo-header">
              {mainItems && mainItems.noteName !== "" ? (
                <DetailHeader title={mainItems.noteName} />
              ) : (
                <DetailHeader title="메모장 이름" />
              )}
            </div>
            <div className="memo-content">
              {mainItems && mainItems.noteName !== "" ? (
                <h1>{mainItems.noteName}</h1>
              ) : (
                <h1>메모장 이름</h1>
              )}

              <div>
                {mainItems && (
                  <span>
                    {moment(mainItems.startDate).format("YYYY/MM/DD")}
                  </span>
                )}
                <span>~</span>
                {mainItems && (
                  <span>{moment(mainItems.endDate).format("YYYY/MM/DD")}</span>
                )}
              </div>
            </div>
            <div className="memo-category">
              <Category noteId={parseInt(id!)} categoryItems={categoryItems} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
