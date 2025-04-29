import React, { useState } from "react";
import global from "../global.scss"
import style from "../css/Todo/Todo.module.scss";

function TodoList() {
    const [inputTodo, setInputTodo] = useState("");
    const [todoList, setTodoList] = useState([
        { id: 1, todo: "할일1" },
        { id: 2, todo: "할일2" },
        { id: 3, todo: "할일3" }
    ]);

    console.log(todoList);
    const activeEnter = (e) => {
        if (e.key === "Enter" && inputTodo.trim() !== "") {
            const newTodoList = {
                id: todoList.length + 1,
                todo: inputTodo.trim()
            };

            setTodoList([...todoList, newTodoList]);
            setInputTodo("");
        }
    }

    // 투두 리스트 출력하기
    const printTodo = todoList.map((todo) => {
        return (
            <li>
                <input type="checkbox" 
                id={`todo-${todo.id}`} 
                className={style.screenReader} />
                <div className={style.labelBox}>
                    <span className={style.checkIcon} aria-hidden="true"></span>
                    <label for={`todo-${todo.id}`}>{todo.todo}</label>
                </div>
                <div className={style.menu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </li>
        );
    });
    return (
        <>
            <h2 className={style.todoTitle}>Todo</h2>
            <div className={style.todoCont}>
                <input type="text"
                    value={inputTodo} 
                    onChange={(e) => setInputTodo(e.target.value)}
                    onKeyDown={(e) => activeEnter(e)}
                    className={style.inputTodo}
                    placeholder="할 일을 기록하세요"></input>
                <div className={style.todoList}></div>
            </div>
            <div className={style.todoList}>
                <ul>
                    {printTodo}
                </ul>
            </div>
            {/* 투두<br></br>
            타이머 숫자 60 이상 안넘게<br></br>
            타이머 끝나면 알람 가도록<br></br>
            뽀모도로 튜토리얼<br></br> */}
        </>
    );
}

export default TodoList;