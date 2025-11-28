import React, { Component, useEffect, useState } from "react";
import TaskInput from "../TaskInput";
import TaskList from "../TaskList";
import style from "./todoList.module.scss";
import Todo from "../../@types/todo.type";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const doneTodos = todos.filter((todo) => todo.done);
  const notDoneTodos = todos.filter((todo) => !todo.done);

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString(),
    };
    console.log(todos);
    setTodos((pre) => [...pre, todo]);
  };

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((pre) => {
      return pre.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done };
        }
        return todo;
      });
    });
  };

  return (
    <div className={style.app}>
      <TaskInput addTodo={addTodo} />
      <TaskList
        todos={notDoneTodos}
        handleDoneTodo={handleDoneTodo}
      />
      <TaskList
        todos={doneTodos}
        doneTaskList
        handleDoneTodo={handleDoneTodo}
      />
    </div>
  );
}
