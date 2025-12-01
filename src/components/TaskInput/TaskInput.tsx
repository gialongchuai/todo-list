import React, { useState } from "react";
import style from "./taskInput.module.scss";

interface TaskInputProps {
  addTodo: (name: string) => void;
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo } = props;
  const [name, setName] = useState<string>(""); // name là value của input nhập do thay đổi liên tục nên state thôi

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // tránh refresh trình duyệt
    addTodo(name); // submit thì callback gọi addToDo
    setName(""); // sau khi add success thì clear input
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value); // mỗi lần thay đổi set lại State
  };

  return (
    <div>
      <h1 className={style.h1}>To do list typescript</h1>
      <form className={style.input_caption} onSubmit={handleSubmit}>
        <input
          className={style.input_text}
          placeholder="Caption goes here"
          type="text"
          name=""
          id=""
          onChange={onChangeInput}
          value={name} // mỗi lần changeInput thì nhớ set lại value là name mới nhé! 
        />
        <button type="submit" className={style.button}>
          ➕
        </button>
      </form>
    </div>
  );
}
