import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faEllipsis, fas } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Cell,
  CellItem,
  editCellToCategoryAsync,
  deleteCellToCategoryAsync,
  addItemToCellAsync,
  BulletPointAsync,
  getCellListAsync,
} from "../store/category-slice";
import { RootState } from "../store";

type CategoryCellProps = {
  noteId: number;
  categoryId: number;
  item: Cell;
  categoryLength: number;
  cellItems: CellItem;
};

const CategoryCell = (props: CategoryCellProps) => {
  const { lineId, text, type, color, bgcolor, font } = props.item;

  const dispatch = useDispatch<any>();

  const cellItems = props.cellItems;
  const cell = cellItems?.cell;

  const categoryId = props.categoryId;
  const noteId = props.noteId;
  const categoryLength = props.categoryLength;

  const [cellText, setCellText] = useState("");
  const [cellId, setCellId] = useState(0);
  const [cellType, setCellType] = useState("");
  const [cellColor, setCellColor] = useState("");
  const [cellBgColor, setCellBgColor] = useState("");
  const [cellFont, setCellFont] = useState("");

  const [cellEffect, setCellEffect] = useState(false);

  const [textStyle, setTextStyle] = useState(false);
  const [textColor, setTextColor] = useState(false);
  const [bgColor, setBgColor] = useState(false);

  const [spanToInput, setSpanToInput] = useState(false);

  const index = cell?.findIndex((it) => it.lineId === cellId);

  // const cellEditHandler = async () => {
  //   await dispatch(getCellListAsync(categoryId));
  // };

  // useEffect(() => {
  //   dispatch(
  //     editCellToCategoryAsync({
  //       categoryId: categoryId,
  //       lineId: cellId,
  //       text: cellText,
  //       type: cellType,
  //       color: cellColor,
  //       bgcolor: cellBgColor,
  //       font: cellFont,
  //       index: index,
  //     })
  //   );
  // }, [cellText]);

  useEffect(() => {
    if (props.item) {
      setCellText(text);
      setCellId(lineId);
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
    setBgColor(false);
  };

  const TextColorHandler = () => {
    setTextColor(!textColor);
    setTextStyle(false);
    setBgColor(false);
  };

  const BgColorHandler = () => {
    setTextColor(false);
    setTextStyle(false);
    setBgColor(!bgColor);
  };

  // const onKeyPress = (e: any) => {
  //   if (e.key === "Enter") {
  //     setSpanToInput(false);
  //     const index = cell?.findIndex((it) => it.lineId === cellId);
  //     dispatch(
  //       addItemToCellAsync({
  //         index: index,
  //         categoryId: categoryId,
  //       })
  //     );
  //     dispatch(getCellListAsync(categoryId));
  //   }
  //   if (e.key === "Backspace" && cellText.length === 0) {
  //     dispatch(
  //       deleteCellToCategoryAsync({ lineId: cellId, categoryId: categoryId })
  //     );
  //     dispatch(getCellListAsync(categoryId));
  //   }
  // };

  const onKeyPress = async (e: any) => {
    if (e.key === "Enter") {
      setSpanToInput(false);
      await dispatch(
        editCellToCategoryAsync({
          categoryId: categoryId,
          lineId: cellId,
          text: cellText,
          type: cellType,
          color: cellColor,
          bgcolor: cellBgColor,
          font: cellFont,
          index: index,
        })
      );
    }
    if (e.key === "Backspace" && cellText.length === 0) {
      dispatch(
        deleteCellToCategoryAsync({ lineId: cellId, categoryId: categoryId })
      );
    }
  };

  const addCellHandler = async () => {
    await dispatch(
      addItemToCellAsync({
        index: index,
        categoryId: categoryId,
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

  const styleSizeHandler = async (e: any) => {
    setCellType(e);
    setCellEffect(false);
    console.log(e);
    await dispatch(
      editCellToCategoryAsync({
        categoryId: categoryId,
        lineId: cellId,
        text: cellText,
        type: e,
        color: cellColor,
        bgcolor: cellBgColor,
        font: cellFont,
        index: index,
      })
    );
  };

  const styleColorHandler = async (e: any) => {
    setCellColor(e);
    setCellEffect(false);
    setTextColor(false);
    await dispatch(
      editCellToCategoryAsync({
        categoryId: categoryId,
        lineId: cellId,
        text: cellText,
        type: cellType,
        color: e,
        bgcolor: cellBgColor,
        font: cellFont,
        index: index,
      })
    );
  };

  const styleBgColorHandler = async (e: any) => {
    setCellBgColor(e);
    setCellEffect(false);
    setBgColor(false);

    console.log(cellEffect);
    await dispatch(
      editCellToCategoryAsync({
        categoryId: categoryId,
        lineId: cellId,
        text: cellText,
        type: cellType,
        color: cellColor,
        bgcolor: e,
        font: cellFont,
        index: index,
      })
    );
  };

  const styleFontrHandler = async (e: any) => {
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
    setCellEffect(false);
    setTextStyle(false);

    await dispatch(
      editCellToCategoryAsync({
        categoryId: categoryId,
        lineId: cellId,
        text: cellText,
        type: cellType,
        color: cellColor,
        bgcolor: cellBgColor,
        font: e,
        index: index,
      })
    );
  };

  const BulletPointHandler = async () => {
    const bulletText = "• ".concat(cellText);
    await dispatch(
      BulletPointAsync({
        categoryId: categoryId,
        lineId: cellId,
        text: bulletText,
      })
    );
    // dispatch(getCellListAsync(categoryId));
  };

  const spanToInputHandler = () => {
    setSpanToInput(true);

    if (cellText === "입력해주세요") {
      setCellText("");
    }
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
            <span onClick={() => styleSizeHandler("h1")}>
              &nbsp;&nbsp;&nbsp;&nbsp;제목 1&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span onClick={() => styleSizeHandler("h2")}>
              &nbsp;&nbsp;&nbsp;&nbsp;제목 2&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span onClick={() => styleSizeHandler("h3")}>
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
            <span onClick={BgColorHandler}>Bg Color</span>
            {bgColor && (
              <div className="bgcolor">
                <span
                  className="colorSpan"
                  onClick={() => styleBgColorHandler("red_bg")}
                >
                  <span className="colorA colorA_red">Bg</span>빨간색
                </span>
                <span
                  className="colorSpan"
                  onClick={() => styleBgColorHandler("yellow_bg")}
                >
                  <span className="colorA colorA_yellow">Bg</span>노란색
                </span>
                <span
                  className="colorSpan"
                  onClick={() => styleBgColorHandler("orange_bg")}
                >
                  <span className="colorA colorA_orange">Bg</span>주황색
                </span>
                <span
                  className="colorSpan"
                  onClick={() => styleBgColorHandler("green_bg")}
                >
                  <span className="colorA colorA_green">Bg</span>초록색
                </span>
                <span
                  className="colorSpan"
                  onClick={() => styleBgColorHandler("blue_bg")}
                >
                  <span className="colorA colorA_blue">Bg</span>파란색
                </span>
                <span
                  className="colorSpan"
                  onClick={() => styleBgColorHandler("purple_bg")}
                >
                  <span className="colorA colorA_purple">Bg</span>보라색
                </span>
                <span
                  className="colorSpan"
                  onClick={() => styleBgColorHandler("pink_bg")}
                >
                  <span className="colorA colorA_pink">Bg</span>분홍색
                </span>
                <span
                  className="colorSpan"
                  onClick={() => styleBgColorHandler("basicbg")}
                >
                  <span className="colorA colorA_black">Bg</span>투명색
                </span>
              </div>
            )}
            <span onClick={BulletPointHandler}>글머리 기호</span>
          </div>
        )}
        <FontAwesomeIcon
          icon={faEllipsis}
          onClick={effectCellHandler}
          className="cellEllipsis"
        />

        {spanToInput ? (
          <input
            id={String(cellId)}
            value={cellText}
            onKeyDown={onKeyPress}
            onChange={(e) => setCellText(e.target.value)}
            className={`${cellType} ${cellColor} ${cellFont} spantoinput`}
            autoFocus
          ></input>
        ) : (
          <span
            onClick={spanToInputHandler}
            className={`${cellType} ${cellColor} ${cellFont} ${cellBgColor} spantoinput`}
          >
            {cellText}
          </span>
        )}
      </div>
    </>
  );
};

export default React.memo(CategoryCell);
