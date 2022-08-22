import { ChangeEvent, FormEvent, useState } from "react";
import "./TodoList.css";

type TodoAddProps = {
  onCreate: (text: string) => void;
};

const TodoAdd = ({ onCreate }: TodoAddProps) => {
  const [value, setValue] = useState("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCreate(value);
    setValue("");
  };
  return (
    <div className="TodoAdd">
      <div className="todo_create_form">
        <form onSubmit={onSubmit}>
          <input
            placeholder="할 일을 입력하세요"
            value={value}
            onChange={onChange}
          />
        </form>
      </div>
    </div>
  );
};
export default TodoAdd;
