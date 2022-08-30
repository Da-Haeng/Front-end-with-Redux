import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions, MemoDataState } from "../store/category-slice";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Cell } from "../store/category-slice";
import { RootState } from "../store";

type CategoryCellProps = {
  mainId: number;
  categoryId: number;
  item: Cell;
};

const CategoryCell = (props: CategoryCellProps) => {
  const mainItems: MemoDataState = useSelector(
    (state: RootState) => state.category.items
  );
  const { id, text, type, color } = props.item;

  const dispatch = useDispatch();

  const categoryId = props.categoryId;
  const mainId = props.mainId;

  const [cellText, setCellText] = useState("");
  const [cellId, setCellId] = useState(0);
  const [cellType, setCellType] = useState("");
  const [cellColor, setCellColor] = useState("");

  useEffect(() => {
    if (props) {
      setCellText(text);
      setCellId(id);
    }
  }, [props.item]);

  const changeTextHandler = (item: any) => {
    setCellText(item);

    // setCell([...cell, { id: cellId, text: cellText }]);
    // console.log(cell);

    // setCell({
    //   id: cellId,
    //   text: cellText,
    // });
    // console.log(cell);

    // dispatch(
    //   categoryActions.editCellToCategory({
    //     id: cellId,
    //     text: cellText,
    //     categoryId: categoryId,
    //     mainId: mainId,
    //   })
    // );
  };
  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      dispatch(
        categoryActions.editCellToCategory({
          id: cellId,
          text: cellText,
          categoryId: categoryId,
          mainId: mainId,
        })
      );
      alert("저장되었습니다");
    }
  };

  const addCellHandler = () => {
    dispatch(
      categoryActions.addCellToCategory({
        id: 3,
        categoryId: categoryId,
        mainId: mainId,
        text: "입력해주세요",
      })
    );
  };

  return (
    <>
      <div className="CategoryCellLine">
        <FontAwesomeIcon
          onClick={addCellHandler}
          icon={faPlus}
          className="cellPlus"
        />
        <FontAwesomeIcon icon={faEllipsis} className="cellEllipsis" />

        <input
          id={String(cellId)}
          value={cellText}
          onKeyPress={onKeyPress}
          onChange={(e) => {
            setCellText(e.target.value);
          }}
        ></input>
      </div>
    </>
  );
};

export default React.memo(CategoryCell);
