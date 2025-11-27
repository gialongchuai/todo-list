import React, {Component} from "react"
import TaskInput from "../TaskInput"
import TaskList from "../TaskList"
import style from './todoList.module.scss'


export default function TodoList() {
    return (
        <div className={style.app}>
            <TaskInput />
            <br />
            <TaskList />
        </div>
    )
}