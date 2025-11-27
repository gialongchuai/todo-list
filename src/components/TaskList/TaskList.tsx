import React, { Component, useState } from "react";
import style from "./taskList.module.scss";
import Todo from "../../@types/todo.type";

interface TaskListProps {
  doneTaskList?: boolean;
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList } = props;
  const [todo, setTodo] = useState<Todo[]>([]);

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString(),
    };
    setTodo((pre) => [...pre, todo]);
  };
  return (
    <div>
      <div>
        <h2 className={style.h2}>
          {doneTaskList ? "Hoàn thành" : "Chưa hoàn thành"}
        </h2>
        <div className={style.item}>
          <div>
            <input type="checkbox" name="" id="" />
            <span>Code HTML</span>
          </div>
          <div>
            {" "}
            <button className={style.button}>🖊️</button>
            <button className={style.button}>🗑️</button>
          </div>
        </div>
      </div>
    </div>
  );
}
