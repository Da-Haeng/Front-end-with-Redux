import React, { useState, useRef, useEffect, useMemo } from "react";
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

  const categoryItems = mainItems.filter((it) => it.mainId === mainId);

  const categoryData = categoryItems.map((it) => it.document);
  const categoryDataObject = categoryData.reduce((it) => it);
  const categoryContent = categoryDataObject.find(
    (it) => it.categoryId === categoryId
  );
  const cell = categoryContent?.cell;
  const cellLength = cell!.length;

  useMemo(() => {
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
    const index = cell?.findIndex((it) => it.id === cellId);

    dispatch(
      categoryActions.addCellToCategory({
        index: index,
        id: cellLength + 1,
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
