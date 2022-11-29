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
  cellEditHandler,
  CellItem,
} from "../store/category-slice";

const CategoryTitle = (props: any) => {
  const dispatch = useDispatch<any>();

  const categoryData: Document = props.categoryItems;
  const cellEdit: boolean = useSelector(
    (state: any) => state.category.cellEdit
  );

  const cellItems: CellItem = useSelector((state: any) => state.category.cell);

  const noteId = props.noteId;
  const categoryLength = categoryData.length + 1;
  const categoryIndex = categoryData[0];

  const [categoryIndexNum, setCategoryIndexNum] = useState(0);

  const [Highlight, setHighlight] = useState(categoryIndexNum);
  const [categoryId, setCategoryId] = useState(categoryIndexNum);
  const [categoryName, setCategoryName] = useState("");
  const [editTitle, setEditTitle] = useState(false);

  const [cateoryawait, setCategoryAwait] = useState(false);

  useEffect(() => {
    if (categoryIndex) {
      setCategoryIndexNum(categoryIndex.categoryId);
      setHighlight(categoryIndexNum);
      setCategoryId(categoryIndexNum);
      dispatch(getCellListAsync(categoryIndexNum));
    }
  }, [categoryData, cateoryawait]);

  useEffect(() => {
    console.log(cellEdit);
    if (cellEdit) {
      dispatch(getCellListAsync(categoryId));
    }
  }, [cellEdit]);
  console.log(cellItems);

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

  let defaultData: any = {
    // categoryName: "카테고리명",
    // noteId: noteId,
    // lineId: 1,
    // text: "입력해주세요",
    // type: "h3",
    // color: "black",
    // bgcolor: "basicbg",
    // font: "basic",
  };

  const addItemHandler = async () => {
    console.log(defaultData.categoryId);
    await dispatch(addItemToCategoryAsync(noteId));
    // dataId.current += 1;
    await dispatch(getCategoryListAsync(noteId));
    setCategoryAwait(!cateoryawait);
  };

  const deleteCategoryHandler = async () => {
    await dispatch(removeItemToCategoryAsync(categoryId));
    await dispatch(getCategoryListAsync(noteId));
    // setHighlight(categoryIndex.categoryId);
    // setCategoryId(categoryIndex.categoryId);
    await dispatch(cellEditHandler());
    setCategoryAwait(!cateoryawait);
  };

  const editTitleHandler = () => {
    setEditTitle(!editTitle);
  };

  const editTitlecomplete = async () => {
    setEditTitle(!editTitle);
    console.log(categoryName);
    await dispatch(
      editTitletoCategoryAsync({
        categoryId: categoryId,
        categoryName: categoryName,
      })
    );
    dispatch(getCategoryListAsync(noteId));
  };
  if (!categoryData) {
    return <div></div>;
  }

  return (
    <>
      {categoryData && (
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
                <span onClick={editTitlecomplete}>수정하기</span>
              </div>
            )}
          </div>
          <div className="category_context">
            {categoryData && (
              <CategoryContent noteId={noteId} categoryId={categoryId} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CategoryTitle;
