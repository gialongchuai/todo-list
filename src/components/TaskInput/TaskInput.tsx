import React, { useState } from "react";
import style from "./taskInput.module.scss";
import Todo from "../../@types/todo.type";

interface TaskInputProps {
  addTodo: (name: string) => void;
  currentTodo: Todo | null | undefined;
  editTodo: (name: string) => void;
  saveTodo: () => void
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, saveTodo } = props;
  const [name, setName] = useState<string>(""); // name là value của input nhập do thay đổi liên tục nên state thôi

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // tránh refresh trình duyệt
    if (currentTodo) { // nếu mà submit mà tồn tịa currentTodo tức todo đang sửa thì gọi saveTodo
      saveTodo();
    } else { // ngược lại tức là thêm 1 todo mới
      addTodo(name); // submit thì callback gọi addToDo
    }
    setName(""); // sau khi add success thì clear input
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (currentTodo) { // nếu đang sửa 1 todo callback bên kia gọi để set lại currentTodo với name đã
      editTodo(value); // đnag thay đổi
    } else {
      setName(value); // mỗi lần thay đổi set lại State
    }
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
          value={currentTodo ? currentTodo.name : name} // mỗi lần changeInput thì nhớ set lại value là name mới nhé!
        />
        <button type="submit" className={style.button}>
          {!currentTodo ? "➕" : "☑️"}
        </button>
      </form>
    </div>
  );
}
