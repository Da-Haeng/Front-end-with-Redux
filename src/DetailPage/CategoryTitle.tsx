import React, { useState, useRef, useEffect, useMemo } from "react";
import { Document } from "../store/category-slice";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions, MemoDataState } from "../store/category-slice";
import { RootState } from "../store";
import CategoryContent from "./CategoryContent";

type CategoryTitleProps = {
  mainId: number;
  item: Document[];
};

const CategoryTitle = (props: CategoryTitleProps) => {
  const mainItems: MemoDataState = useSelector(
    (state: RootState) => state.category.items
  );

  const dispatch = useDispatch();

  const categoryData = props.item;
  const categoryIndex = categoryData[0];

  const mainId = props.mainId;

  const categoryItems = mainItems.filter((it) => it.mainId === mainId);
  const categoryItem = categoryItems.map((it) => it.document);
  const categoryDataObject = categoryItem.reduce((it) => it);
  const categoryLength = categoryDataObject.length + 1;

  const dataId = useRef(categoryLength);

  const [Highlight, setHighlight] = useState(categoryIndex.categoryId);
  const [categoryId, setCategoryId] = useState(categoryIndex.categoryId);
  const [categeoryTitle, setCategoryTitle] = useState("");
  const [editTitle, setEditTitle] = useState(false);

  useEffect(() => {
    setHighlight(categoryIndex.categoryId);
    setCategoryId(categoryIndex.categoryId);
  }, [categoryData]);

  const onHighlight = (id: number) => {
    setHighlight(id);
    setCategoryId(id);
    console.log(categoryId);
  };

  useEffect(() => {
    const title = categoryDataObject.find((it) => it.categoryId === categoryId);
    if (title) {
      setCategoryTitle(title.categoryTitle);
    }
  }, [categoryId]);

  const addItemHandler = () => {
    dispatch(
      categoryActions.addItemToCategory({
        categoryId: dataId.current,
        categoryTitle: "카테고리명",
        mainId: mainId,
      })
    );

    dataId.current += 1;
  };

  const deleteCategoryHandler = () => {
    dispatch(
      categoryActions.removeItemToCateogory({
        categoryId: categoryId,
        mainId: mainId,
      })
    );
    setHighlight(categoryIndex.categoryId);
    setCategoryId(categoryIndex.categoryId);
  };

  const editTitleHandler = () => {
    setEditTitle(!editTitle);
    console.log(editTitle);
  };

  return (
    <>
      <div className="category_container">
        {categoryData &&
          categoryData.map((it) => (
            <>
              <span
                id={String(it.categoryId)}
                className={
                  Highlight === it.categoryId
                    ? "category_title_highlight"
                    : "category_title"
                }
                onClick={() => onHighlight(it.categoryId)}
              >
                {it.categoryTitle}
              </span>
            </>
          ))}
        <span className="cateogory_create" onClick={addItemHandler}>
          + 카테고리 추가
        </span>
      </div>

      <div className="CategorySetSmall">
        <span onClick={editTitleHandler}>제목 수정</span>
        <span onClick={deleteCategoryHandler}>페이지 삭제</span>
      </div>
      {/* {editTitle && (
        <div className="edittitle_box">
          <input
            type="text"
            value={categeoryTitle}
            autoFocus
            className="edittitle"
            size={10}
            onChange={(e) => setCategoryTitle(e.target.value)}
          />
        </div>
      )} */}

      <div className="category_context">
        {categoryData && (
          <CategoryContent
            mainId={mainId}
            categoryId={categoryId}
            item={categoryData}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(CategoryTitle);
