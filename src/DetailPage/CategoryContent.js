import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../store/category-slice";
import CategoryCell from "./CategoryCell";
import "./Detail.css";

const CategoryContent = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = props.id;
  const categoryItem = props.item;
  const categoryId = props.categoryId;

  const categoryContent = categoryItem.find(
    (it) => parseInt(it.categoryId) === parseInt(categoryId)
  );

  const categoryCell = categoryContent.cell;

  const categoryRemoveHandler = () => {
    dispatch(
      categoryActions.removeItemToCategory({
        categoryId: categoryId,
        mainId: id,
      })
    );
    // navigate("/main", { replace: true });
  };
  console.log(categoryCell);
  return (
    <div className="CategoryContent">
      <div className="CategorySetSmall">
        <span>제목 수정</span>
        <span onClick={categoryRemoveHandler}>페이지 삭제</span>
      </div>
      <div className="CategoryCell">
        {categoryCell.map((it) => (
          <CategoryCell id={id} item={it} categoryId={categoryId} />
        ))}
      </div>
    </div>
  );
};
export default CategoryContent;
