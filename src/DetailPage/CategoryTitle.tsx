import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import CategoryContent from "./CategoryContent";
import {
  getCellListAsync,
  Category,
  addItemToCategoryAsync,
  removeItemToCategoryAsync,
  Document,
  getCategoryListAsync,
  editTitletoCategoryAsync,
} from "../store/category-slice";

const CategoryTitle = (props: any) => {
  const dispatch = useDispatch<any>();

  const categoryData: Document = props.categoryItems;
  const categoryIndex = categoryData[0];

  const noteId = props.noteId;

  const categoryLength = categoryData.length + 1;

  const dataId = useRef(categoryLength);

  const [Highlight, setHighlight] = useState(categoryIndex.categoryId);
  const [categoryId, setCategoryId] = useState(categoryIndex.categoryId);
  const [categoryName, setCategoryName] = useState("");
  const [editTitle, setEditTitle] = useState(false);

  useEffect(() => {
    setHighlight(categoryIndex.categoryId);
    setCategoryId(categoryIndex.categoryId);
  }, [categoryData]);

  const onHighlight = async (id: number) => {
    setHighlight(id);
    setCategoryId(id);
    await dispatch(getCellListAsync(id));
  };

  useEffect(() => {
    const title = categoryData.find((it) => it.categoryId === categoryId);
    if (title) {
      setCategoryName(title.categoryName);
    }
  }, [categoryId]);

  let defaultData: Category = {
    categoryId: dataId.current,
    categoryName: "카테고리명",
    lineId: 1,
    text: "입력해주세요",
    type: "h3",
    color: "black",
    bgcolor: "basicbg",
    font: "basic",
  };

  const addItemHandler = () => {
    dispatch(addItemToCategoryAsync(defaultData));
    dataId.current += 1;
  };

  const deleteCategoryHandler = async () => {
    await dispatch(removeItemToCategoryAsync(categoryId));
    await dispatch(getCategoryListAsync(noteId));
    // setHighlight(categoryIndex.categoryId);
    // setCategoryId(categoryIndex.categoryId);
  };

  const editTitleHandler = () => {
    setEditTitle(!editTitle);
  };

  const editTitlecomplete = () => {
    setEditTitle(!editTitle);
    console.log(categoryName);
    dispatch(
      editTitletoCategoryAsync({
        categoryId: categoryId,
        categoryName: categoryName,
      })
    );
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
                {it.categoryName}
              </span>
            </>
          ))}
        <span className="cateogory_create" onClick={addItemHandler}>
          + 카테고리 추가
        </span>
      </div>

      <div className="CategorySetSmall">
        <div className="editTitle">
          <span onClick={editTitleHandler}>제목 수정</span>
          <span onClick={deleteCategoryHandler}>페이지 삭제</span>
        </div>

        {editTitle && (
          <div className="edittitle_box">
            <input
              type="text"
              value={categoryName}
              autoFocus
              className="edittitle"
              size={10}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <span onClick={editTitlecomplete}>수정 완료</span>
          </div>
        )}
      </div>

      <div className="category_context">
        {categoryData && (
          <CategoryContent noteId={noteId} categoryId={categoryId} />
        )}
      </div>
    </>
  );
};

export default React.memo(CategoryTitle);
