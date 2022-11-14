import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoryActions } from "../store/category-slice";
import CategoryCell from "./CategoryCell";
import { Document } from "../store/category-slice";
import "./Detail.css";

type CategoryContentProps = {
  noteId: number;
  categoryId: number;
};

const CategoryContent = (props: CategoryContentProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cellItems = useSelector((state: any) => state.category.cell);

  const noteId = props.noteId;
  const categoryId = props.categoryId;

  const categoryContent = cellItems?.cell;
  const categoryLength = categoryContent?.length;
  console.log(categoryContent);

  return (
    <div className="CategoryContent">
      <div className="CategoryCell">
        {categoryContent?.map((it: any) => (
          <CategoryCell
            noteId={noteId}
            item={it}
            categoryId={categoryId}
            categoryLength={categoryLength}
          />
        ))}
      </div>
    </div>
  );
};
export default CategoryContent;
