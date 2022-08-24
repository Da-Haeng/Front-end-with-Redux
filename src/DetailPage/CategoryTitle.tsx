import React, { useState } from "react";

type CategoryTitleProps = {
  id: number,
  title: number
}

const CategoryTitle = (props: CategoryTitleProps) => {
  const { id, title } = props;
  const [Highlight, setHighlight] = useState(1);
  const [memoId, setMemoId] = useState(1);

  console.log(id);
  const onHighlight = (id: number) => {
    setHighlight(id);
    setMemoId(id);
  };

  const doubleClickHandler = () => {
    console.log(memoId);
  };
  return (
    <div>
      <span
        id={String(id)}
        className={
          Highlight === id ? "category_title_highlight" : "category_title"
        }
        onClick={() => onHighlight(title)}
        onDoubleClick={doubleClickHandler}
      >
        {title}
      </span>
    </div>
  );
};

export default CategoryTitle;
