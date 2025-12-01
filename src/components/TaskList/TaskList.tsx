import React, { Component, useState } from "react";
import style from "./taskList.module.scss";
import Todo from "../../@types/todo.type";

interface TaskListProps {
  todos: Todo[];
  handleDoneTodo: (id: string, done: boolean) => void;
  doneTaskList?: boolean;
  findTodo: (id: string) => void;
  deleteTodo: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { todos, handleDoneTodo, doneTaskList, findTodo, deleteTodo } = props;

  return (
    <div>
      <div>
        <h2 className={`${style.h2} ${doneTaskList ? style.done : ""}`}>
          {doneTaskList ? "Hoàn thành" : "Chưa hoàn thành"}
        </h2>
        {todos.length === 0 ? (
          <p>Không có công việc!</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className={style.item}>
              <div className={style.info}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={(e) => handleDoneTodo(todo.id, e.target.checked)} // Xử lý 
                  // khi người dùng nhấn vào checkbox done hoặc notdone => callback fun
                />
                <span className={todo.done ? style.done : ""}>{todo.name}</span>
              </div>
              <div>
                <button className={style.button} onClick={() => findTodo(todo.id)}>🖊️</button>
                <button className={style.button} onClick={() => deleteTodo(todo.id)}>🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
