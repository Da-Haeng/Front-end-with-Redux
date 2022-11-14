import React, { useState, useRef, useEffect, useMemo } from "react";
import { Document } from "../store/category-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import CategoryContent from "./CategoryContent";
import { getCellListAsync } from "../store/category-slice";

type CategoryTitleProps = {
  mainId: number;
  item: Document[];
};

const CategoryTitle = (props: any) => {
  const dispatch = useDispatch<any>();

  const categoryData = props.categoryItems;
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
    const title = categoryData.find((it: any) => it.categoryId === categoryId);
    if (title) {
      setCategoryName(title.categoryName);
    }
  }, [categoryId]);

  const addItemHandler = () => {
    // dispatch(
    //   categoryActions.addItemToCategory({
    //     categoryId: dataId.current,
    //     categoryTitle: "카테고리명",
    //     mainId: mainId,
    //   })
    // );
    // dispatch(addItemToCategoryAsync({ noteId:noteId}));

    dataId.current += 1;
  };

  const deleteCategoryHandler = () => {
    // dispatch(
    //   categoryActions.removeItemToCateogory({
    //     categoryId: categoryId,
    //     mainId: mainId,
    //   })
    // );
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
          categoryData.map((it: any) => (
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
        <span onClick={editTitleHandler}>제목 수정</span>
        <span onClick={deleteCategoryHandler}>페이지 삭제</span>
      </div>
      {/* {editTitle && (
        <div className="edittitle_box">
          <input
            type="text"
            value={categoryTitle}
            autoFocus
            className="edittitle"
            size={10}
            onChange={(e) => setCategoryTitle(e.target.value)}
          />
        </div>
      )} */}

      <div className="category_context">
        {categoryData && (
          <CategoryContent noteId={noteId} categoryId={categoryId} />
        )}
      </div>
    </>
  );
};

export default React.memo(CategoryTitle);
