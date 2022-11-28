import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CellItem } from "../store/category-slice";
import CategoryCell from "./CategoryCell";
import "./Detail.css";

type CategoryContentProps = {
  noteId: number;
  categoryId: number;
};

const CategoryContent = (props: CategoryContentProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cellItems: CellItem = useSelector((state: any) => state.category.cell);

  const noteId = props.noteId;
  const categoryId = props.categoryId;

  const categoryContent = cellItems?.cell;
  console.log(categoryContent);
  const categoryLength = categoryContent?.length;

  return (
    <div className="CategoryContent">
      <div className="CategoryCell">
        {categoryContent?.map((it) => (
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
