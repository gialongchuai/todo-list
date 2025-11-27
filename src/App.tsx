import React from 'react';
import logo from './logo.svg';
import style from './style.module.scss';
import TodoList from './components/TodoList/TodoList'

function App() {
  return (
    <div className={style.app}>
      <TodoList />
    </div>
  );
}

export default App;
