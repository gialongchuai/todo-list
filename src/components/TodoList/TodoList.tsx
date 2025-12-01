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
    setTodos((pre) => [...pre, todo]);
  };

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((pre) => { // duyệt qua mỗi cái todo chứa 3 field
      return pre.map((todo) => {
        if (todo.id === id) { // tìm đúng id đã click done or notdone
          return { ...todo, done }; // set lại các field ban đầu và set lại done mới
        }
        return todo; // trả về todo với id đã fix
      });
    });
  };

  return (
    <div className={style.app}>
      <TaskInput addTodo={addTodo} />
      <TaskList // ko hoàn thành không truyền bên prop hứng ko có thì mặc định là false
        todos={notDoneTodos}
        handleDoneTodo={handleDoneTodo}
      />
      <TaskList
        todos={doneTodos}
        doneTaskList // hoàn thành
        handleDoneTodo={handleDoneTodo}
      />
    </div>
  );
}
