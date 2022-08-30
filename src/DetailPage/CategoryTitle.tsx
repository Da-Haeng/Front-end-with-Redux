import { useState, useRef, useEffect } from "react";
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
  const dispatch = useDispatch();
  const dataId = useRef(4);

  const categoryData = props.item;
  const categoryIndex = categoryData[0];

  const mainId = props.mainId;

  const [Highlight, setHighlight] = useState(categoryIndex.categoryId);
  const [categoryId, setCategoryId] = useState(categoryIndex.categoryId);

  // useEffect(() => {
  //   setHighlight(categoryIndex.categoryId);
  //   setCategoryId(categoryIndex.categoryId);
  // }, [categoryData]);

  const onHighlight = (id: number) => {
    setHighlight(id);
    setCategoryId(id);
  };

  const addItemHandler = () => {
    dispatch(
      categoryActions.addItemToCategory({
        categoryId: dataId.current,
        categoryTitle: "카테고리명",
        mainId: mainId,
      })
    );
    dispatch(
      categoryActions.addCellToCategory({
        id: 1,
        categoryId: dataId.current,
        mainId: mainId,
        text: "입력해주세요",
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
  };

  return (
    <>
      <div className="category_container">
        {categoryData &&
          categoryData.map((it) => (
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
          ))}
        <span className="cateogory_create" onClick={addItemHandler}>
          + 카테고리 추가
        </span>
      </div>

      <div className="CategorySetSmall">
        <span>제목 수정</span>
        <span onClick={deleteCategoryHandler}>페이지 삭제</span>
      </div>
      <div className="CategorySetSmall2">
        <span>각 cell 수정 후 Enter를 눌러 저장해주세요</span>
      </div>

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

export default CategoryTitle;
