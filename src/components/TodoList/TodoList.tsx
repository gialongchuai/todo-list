import React, { Component, useDebugValue, useEffect, useState } from "react";
import TaskInput from "../TaskInput";
import TaskList from "../TaskList";
import style from "./todoList.module.scss";
import Todo from "../../@types/todo.type";

interface HandleNewTodo {
  (todos: Todo[]): Todo[];
}

const syncReactToLocal = (handleNewTodo: HandleNewTodo) => {
  const todosString = localStorage.getItem("todos");
  const todoObj: Todo[] = JSON.parse(todosString || "[]"); // string như này parse ra là 1 arr rỗng
  const newTodosObj = handleNewTodo(todoObj);
  localStorage.setItem("todos", JSON.stringify(newTodosObj));
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const doneTodos = todos.filter((todo) => todo.done);
  const notDoneTodos = todos.filter((todo) => !todo.done);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    const todoObj: Todo[] = JSON.parse(todosString || "[]"); // string như này parse ra là 1 arr rỗng
    setTodos(todoObj);
  }, []);

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString(),
    };
    setTodos((pre) => [...pre, todo]);

    // const todosString = localStorage.getItem("todos");
    // const todoObj: Todo[] = JSON.parse(todosString || "[]"); // string như này parse ra là 1 arr rỗng
    // const newTodosObj = [...todoObj, todo];
    // localStorage.setItem("todos", JSON.stringify(newTodosObj));
    const handler = (todoObj: Todo[]) => [...todoObj, todo];
    syncReactToLocal(handler);
  };

  const handleDoneTodo = (id: string, done: boolean) => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done };
        }
        return todo;
      });
    };
    // setTodos((pre) => {
    //   // duyệt qua mỗi cái todo chứa 3 field
    //   return pre.map((todo) => {
    //     if (todo.id === id) {
    //       // tìm đúng id đã click done or notdone
    //       return { ...todo, done }; // set lại các field ban đầu và set lại done mới
    //     }
    //     return todo; // trả về todo với id đã fix
    //   });
    // });
    setTodos(handler);
    syncReactToLocal(handler);
  };

  const findTodo = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) setCurrentTodo(todo);
  };

  const editTodo = (name: string) => {
    setCurrentTodo((pre) => {
      // thay đổi 1 kí tự thì set lại current ngay lập tức
      if (pre) {
        return { ...pre, name };
      }
      return null;
    });
  };

  const saveTodo = () => {
    // nếu bấm submit có tồn tại ông current tức là muốn save lại name mới cho todo cũ
    if (!currentTodo) return;

    // setTodos((pre) => {
    //   // đi qua từng ông todo và
    //   return pre.map((todo) => {
    //     if (todo.id === currentTodo.id) {
    //       // tìm đúng ông todo đang sửa, với id bằng nhau
    //       return currentTodo; // trả về giá trị cho ông tồn tại trước đó bằng ông sửa value tức name nảy giờ
    //     }
    //     return todo; // còn mấy ông todo khác thì bỏ qua (tức là set lại giá trị cũ)
    //   });
    // });

    // const todosString = localStorage.getItem("todos");
    // const todoObj: Todo[] = JSON.parse(todosString || "[]");
    // const newObj = todoObj.map((todo) => {
    //     if (todo.id === currentTodo.id) {
    //       return currentTodo;
    //     }
    //     return todo;
    //   });
    // localStorage.setItem("todos", JSON.stringify(newObj));

    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === currentTodo.id) {
          return currentTodo;
        }
        return todo;
      });
    };
    setTodos(handler);
    setCurrentTodo(null); // sau khi set thì set lại currentTodo là null để không còn sửa ông nào nữa.

    // const todosString = localStorage.getItem("todos");
    // const todoObj: Todo[] = JSON.parse(todosString || "[]");
    // const newObj = handler(todoObj);
    // localStorage.setItem("todos", JSON.stringify(newObj));
    syncReactToLocal(handler);
  };

  const deleteTodo = (id: string) => {
    setCurrentTodo(null); // hàm delete này đi qua từng todo trả về mảng mới

    const handler = (todoObj: Todo[]) => {
      return todoObj.filter((todoObj) => todoObj.id !== id);
    };
    // setTodos((pre) => pre.filter((todo) => todo.id !== id)); // bỏ ông id muốn xóa ra
    setTodos(handler);
    syncReactToLocal(handler);
  };

  return (
    <div className={style.app}>
      <TaskInput
        addTodo={addTodo}
        editTodo={editTodo}
        currentTodo={currentTodo}
        saveTodo={saveTodo}
      />
      <TaskList // ko hoàn thành không truyền bên prop hứng ko có thì mặc định là false
        todos={notDoneTodos}
        handleDoneTodo={handleDoneTodo}
        findTodo={findTodo}
        deleteTodo={deleteTodo}
      />
      <TaskList
        todos={doneTodos}
        doneTaskList // hoàn thành
        handleDoneTodo={handleDoneTodo}
        findTodo={findTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}
