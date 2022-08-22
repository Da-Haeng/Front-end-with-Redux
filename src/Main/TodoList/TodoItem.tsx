import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties } from "react";
import { Todo } from "../../store/todoList-slice";
import "./TodoList.css";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};

const TodoItem = ({ todo, onToggle, onRemove }: TodoItemProps) => {
  const todoStyle: CSSProperties = {
    textDecoration: todo.isDone ? "line-through" : "none",
  };

  const removeStyle: CSSProperties = {
    marginLeft: 8,
    color: "red",
  };
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleRemove = () => {
    onRemove(todo.id);
  };
  return (
    <div className="TodoItem">
      {/* <span onClick={handleToggle} style={todoStyle}>
                    {todo.text}
                </span>
                <button onClick={handleRemove} style={removeStyle}>
                    삭제
                </button> */}

      {todo.isDone && (
        <div className="todo_btn_done" onClick={handleToggle}>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}
      {!todo.isDone && (
        <div className="todo_btn_notyet" onClick={handleToggle}></div>
      )}
      {todo.isDone && <div className="todo_done">{todo.text}</div>}
      {!todo.isDone && <div className="todo_notyet">{todo.text}</div>}
      <div className="remove_btn" onClick={handleRemove}>
        <FontAwesomeIcon icon={faTrash} className="trash-icon" />
      </div>
    </div>
  );
};
export default TodoItem;
