import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  categoryActions,
  CategoryState,
  Document,
} from "../store/category-slice";
import CategoryTitle from "./CategoryTitle";
import "./Detail.css";
import { getCellListAsync } from "../store/category-slice";

type CategoryProps = {
  noteId: number;
};

const Category = (props: CategoryProps) => {
  const noteId = props.noteId;
  const dispatch = useDispatch<any>();

  const categoryItems: Document = useSelector(
    (state: any) => state.category.document
  );
  const categoryIndex = categoryItems[0]?.categoryId;

  useEffect(() => {
    dispatch(getCellListAsync(categoryIndex));
  });

  console.log(categoryItems);
  // const categoryItems = categoryItems.filter((it) => it.noteId === noteId);
  // const categoryData = categoryItems.map((it) => it.document);
  // const categoryData = categoryItems.reduce((it) => it);

  return (
    <div className="category">
      <CategoryTitle categoryItems={categoryItems} noteId={noteId} />
    </div>
  );
};

export default Category;
