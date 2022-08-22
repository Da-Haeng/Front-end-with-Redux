import { faCircleChevronUp, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Todo, todoListActions } from "../../store/todoList-slice";
import TodoAdd from "./TodoAdd";
import TodoList from "./TodoList";
import "./TodoList.css";

const TodoContainer = () => {
    const [open, setOpen] = useState(false);
    const todos = useSelector((state: RootState) => state.todoList);
    const dispatch = useDispatch();

    const openToggle = () => {
        setOpen(!open);
      };

    const onCreate = (todo: string) => {
        dispatch(todoListActions.create({text: todo}));
    }
    const onToggle = (id: number) => {
        dispatch(todoListActions.toggle({id: id}));
    }
    const onRemove = (id: number) => {
        dispatch(todoListActions.remove({id: id}));
    }
    return (
        <div className="TodoContainer">
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove}/>
            <div className="todo_create_form">
            {open && (
              <TodoAdd onCreate={onCreate}/>
            )}
          </div>
          <div className="todo_create_btn" onClick={openToggle}>
            {open && <FontAwesomeIcon icon={faCircleChevronUp} className="openToggle"/>}
            {!open && <FontAwesomeIcon icon={faCirclePlus} className="openToggle"/>}
          </div>
        </div>
    )
}
export default TodoContainer;