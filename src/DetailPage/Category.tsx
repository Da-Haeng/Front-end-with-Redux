import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { categoryActions, MemoDataState } from "../store/category-slice";
import CategoryTitle from "./CategoryTitle";
import "./Detail.css";

type CategoryProps = {
  mainId: number;
};

const Category = (props: CategoryProps) => {
  const mainId = props.mainId;
  const dispatch = useDispatch();

  const mainItems: MemoDataState = useSelector(
    (state: RootState) => state.category.items
  );
  const categoryItems = mainItems.filter((it) => it.mainId === mainId);

  const categoryData = categoryItems.map((it) => it.document);
  const categoryDataObject = categoryData.reduce((it) => it);

  return (
    <div className="category">
      <CategoryTitle item={categoryDataObject} mainId={mainId} />
    </div>
  );
};

export default Category;
