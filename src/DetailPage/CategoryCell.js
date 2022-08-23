import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../store/category-slice";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoryCell = (props) => {
  const dispatch = useDispatch();

  const categoryId = props.categoryId;
  const id = props.id;
  const cellItem = props.item;

  const [cellText, setCellText] = useState("");
  const [cellId, setCellId] = useState();
  console.log(cellText);

  useEffect(() => {
    if (cellItem) {
      setCellText(cellItem.text);
      setCellId(cellItem.id);
    }
  }, [cellItem]);

  const changeTextHandler = (item) => {
    setCellText(item);
    dispatch(
      categoryActions.editItemToCategory({
        id: cellId,
        text: cellText,
        categoryId: categoryId,
        mainId: id,
      })
    );
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(
        categoryActions.addCellToCategory({
          id: 3,
          categoryId: categoryId,
          mainId: id,
        })
      );
    }
  };

  return (
    <div className="CategoryCellLine">
      <FontAwesomeIcon icon={faEllipsis} className="cellEllipsis" />
      <input
        id={cellId}
        value={cellText}
        onKeyPress={onKeyPress}
        onChange={(e) => changeTextHandler(e.target.value)}
      ></input>
    </div>
  );
};

export default CategoryCell;
