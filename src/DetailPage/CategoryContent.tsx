import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoryActions } from "../store/category-slice";
import CategoryCell from "./CategoryCell";
import { Document } from "../store/category-slice";
import "./Detail.css";

type CategoryContentProps = {
  mainId: number;
  categoryId: number;
  item: Document[];
};

const CategoryContent = (props: CategoryContentProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mainId = props.mainId;
  const categoryItem = props.item;
  const categoryId = props.categoryId;

  const categoryContent = categoryItem.find(
    (it: Document) => it.categoryId === categoryId
  );

  const categoryCell = categoryContent?.cell;

  return (
    <div className="CategoryContent">
      <div className="CategoryCell">
        {categoryCell?.map((it) => (
          <CategoryCell mainId={mainId} item={it} categoryId={categoryId} />
        ))}
      </div>
    </div>
  );
};
export default CategoryContent;
