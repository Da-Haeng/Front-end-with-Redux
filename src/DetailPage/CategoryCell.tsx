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
  const { id, text, type, color, bgcolor, font } = props.item;

  const dispatch = useDispatch();

  const categoryId = props.categoryId;
  const mainId = props.mainId;

  const [cellText, setCellText] = useState("");
  const [cellId, setCellId] = useState(0);
  const [cellType, setCellType] = useState("");
  const [cellColor, setCellColor] = useState("");
  const [cellBgColor, setCellBgColor] = useState("");
  const [cellFont, setCellFont] = useState("");

  const [cellEffect, setCellEffect] = useState(false);

  const categoryItems = mainItems.filter((it) => it.mainId === mainId);

  const categoryData = categoryItems.map((it) => it.document);
  const categoryDataObject = categoryData.reduce((it) => it);
  const categoryContent = categoryDataObject.find(
    (it) => it.categoryId === categoryId
  );
  const cell = categoryContent?.cell;
  const cellLength = cell!.length;

  const [textStyle, setTextStyle] = useState(false);
  const [textColor, setTextColor] = useState(false);

  useMemo(() => {
    if (props) {
      setCellText(text);
      setCellId(id);
      setCellType(type);
      setCellColor(color);
      setCellBgColor(bgcolor);
      setCellFont(font);
      setCellEffect(false);
    }
  }, [props.item]);

  const TextStyletHandler = () => {
    setTextStyle(!textStyle);
    setTextColor(false);
  };

  const TextColorHandler = () => {
    setTextColor(!textColor);
    setTextStyle(false);
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

  const effectCellHandler = () => {
    if (cellEffect) {
      setCellEffect(false);
    } else {
      setCellEffect(!cellEffect);
      setTextColor(false);
      setTextStyle(false);
    }
  };

  const styleSizeHandler = (e: any) => {
    setCellType(e);
    dispatch(
      categoryActions.StyleSizeToCategory({
        id: cellId,
        style: cellType,
        categoryId: categoryId,
        mainId: mainId,
      })
    );
    setCellEffect(true);
    e.preventDefault();
  };

  const styleColorHandler = (e: any) => {
    setCellColor(e);
    dispatch(
      categoryActions.StyleColorToCategory({
        id: cellId,
        style: cellColor,
        categoryId: categoryId,
        mainId: mainId,
      })
    );
    setCellEffect(true);
    e.preventDefault();
  };

  const styleFontrHandler = (e: any) => {
    if (e === "bold") {
      if (cellFont === "bold") {
        setCellFont("basic");
      } else {
        setCellFont(e);
      }
    }
    if (e === "underline") {
      if (cellFont === "underline") {
        setCellFont("basic");
      } else {
        setCellFont(e);
      }
    }
    if (e === "linethrough") {
      if (cellFont === "linethrough") {
        setCellFont("basic");
      } else {
        setCellFont(e);
      }
    }
    if (e === "italic") {
      if (cellFont === "italic") {
        setCellFont("basic");
      } else {
        setCellFont(e);
      }
    }

    dispatch(
      categoryActions.StyleFontToCategory({
        id: cellId,
        style: cellFont,
        categoryId: categoryId,
        mainId: mainId,
      })
    );
    setCellEffect(true);
    e.preventDefault();
  };

  return (
    <>
      <div className="CategoryCellLine">
        <FontAwesomeIcon
          onClick={addCellHandler}
          icon={faPlus}
          className="cellPlus"
        />
        {cellEffect && (
          <div className="cellEffect">
            <span onClick={() => styleSizeHandler("h3")}>
              &nbsp;&nbsp;&nbsp;&nbsp;제목 1&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span onClick={() => styleSizeHandler("h2")}>
              &nbsp;&nbsp;&nbsp;&nbsp;제목 2&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span onClick={() => styleSizeHandler("h1")}>
              &nbsp;&nbsp;&nbsp;&nbsp;제목 3&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span onClick={TextStyletHandler}>Text Style</span>
            {textStyle && (
              <div className="textstyle">
                <span
                  className="style_bold"
                  onClick={() => styleFontrHandler("bold")}
                >
                  B
                </span>
                <span
                  className="style_underline"
                  onClick={() => styleFontrHandler("underline")}
                >
                  B
                </span>
                <span
                  className="style_linethrough"
                  onClick={() => styleFontrHandler("linethrough")}
                >
                  B
                </span>
                <span
                  className="style_italic"
                  onClick={() => styleFontrHandler("italic")}
                >
                  B
                </span>
              </div>
            )}
            <span onClick={TextColorHandler}>Text Color</span>
            {textColor && (
              <div className="textcolor">
                <span
                  className="colorSpan"
                  onClick={() => styleColorHandler("red")}
                >
                  <span className="colorA colorA_red">A</span>빨간색
                </span>
                <span
                  className="colorSpan"
                  onClick={() => styleColorHandler("yellow")}
                >
                  <span className="colorA colorA_yellow">A</span>노란색
                </span>
                <span
                  className="colorSpan"
                  onClick={() => styleColorHandler("orange")}
                >
                  <span className="colorA colorA_orange">A</span>주황색
                </span>
                <span
                  className="colorSpan"
                  onClick={() => styleColorHandler("green")}
                >
                  <span className="colorA colorA_green">A</span>초록색
                </span>
                <span
                  className="colorSpan"
                  onClick={() => styleColorHandler("blue")}
                >
                  <span className="colorA colorA_blue">A</span>파란색
                </span>
                <span
                  className="colorSpan"
                  onClick={() => styleColorHandler("purple")}
                >
                  <span className="colorA colorA_purple">A</span>보라색
                </span>
                <span
                  className="colorSpan"
                  onClick={() => styleColorHandler("pink")}
                >
                  <span className="colorA colorA_pink">A</span>분홍색
                </span>

                <span
                  className="colorSpan"
                  onClick={() => styleColorHandler("black")}
                >
                  <span className="colorA colorA_black">A</span>검정색
                </span>
              </div>
            )}
          </div>
        )}
        <FontAwesomeIcon
          icon={faEllipsis}
          onClick={effectCellHandler}
          className="cellEllipsis"
        />

        <input
          id={String(cellId)}
          value={cellText}
          onKeyPress={onKeyPress}
          onChange={(e) => {
            setCellText(e.target.value);
          }}
          className={`${cellType} ${cellColor} ${cellFont}`}
        ></input>
      </div>
    </>
  );
};

export default React.memo(CategoryCell);
