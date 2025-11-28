import React, { useState } from "react";
import style from "./taskInput.module.scss";

interface TaskInputProps {
  addTodo: (name: string) => void;
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo } = props;
  const [name, setName] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(name);
    setName("");
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
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
        />
        <button type="submit" className={style.button}>
          ➕
        </button>
      </form>
    </div>
  );
}
