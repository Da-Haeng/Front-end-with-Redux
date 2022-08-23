import { useState } from "react";
import "./Detail.css";

const CategoryTitle = (props) => {
  const { categoryId, categoryTitle } = props.item;

  const [memoId, setMemoId] = useState(1);
  const [Highlight, setHighlight] = useState();

  const onHighlight = (id) => {
    setHighlight(id);
    setMemoId(id);
  };
  console.log(Highlight);
  return (
    <div>
      <span
        id={categoryId}
        className={
          Highlight === categoryId
            ? "category_title_highlight"
            : "category_title"
        }
        onClick={() => onHighlight(categoryId)}
      >
        {categoryTitle}
      </span>
    </div>
  );
};

export default CategoryTitle;
