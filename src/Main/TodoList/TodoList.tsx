import { Todo } from "../../store/todoList-slice";
import TodoItem from "./TodoItem";
import "./TodoList.css";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};
const TodoList = ({ todos, onToggle, onRemove }: TodoListProps) => {
  // const todos
  if (todos.length === 0) return <p>오늘의 할일은 무엇인가요?</p>;
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoItem todo={todo} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </div>
  );
};
export default TodoList;
