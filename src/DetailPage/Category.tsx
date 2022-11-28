import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  categoryActions,
  CategoryState,
  Document,
  getCategoryListAsync,
} from "../store/category-slice";
import CategoryTitle from "./CategoryTitle";
import "./Detail.css";
import { getCellListAsync } from "../store/category-slice";

type CategoryProps = {
  noteId: number;
  categoryItems: any;
};

const Category = (props: CategoryProps) => {
  const noteId = props.noteId;
  const categoryItems = props.categoryItems;

  const dispatch = useDispatch<any>();

  // const getCategoryHandler = async () => {
  //   await dispatch(getCategoryListAsync(props.noteId));
  // };

  // const categoryItems: Document = useSelector(
  //   (state: any) => state.category.document
  // );

  // useEffect(() => {
  //   // getCategoryHandler();
  //   if (categoryItems) {
  //     dispatch(getCellListAsync(categoryIndex));
  //   }
  // }, []);

  // const categoryItems = categoryItems.filter((it) => it.noteId === noteId);
  // const categoryData = categoryItems.map((it) => it.document);
  // const categoryData = categoryItems.reduce((it) => it);

  if (!categoryItems) {
    return <div></div>;
  }
  return (
    <>
      {categoryItems && (
        <div className="category">
          <CategoryTitle categoryItems={categoryItems} noteId={noteId} />
        </div>
      )}
    </>
  );
};

export default Category;
