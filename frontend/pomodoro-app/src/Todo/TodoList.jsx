import React, { useState }from "react";
import global from "../global.scss"
import style from "../css/Todo/Todo.module.scss";

function TodoList() {
    const [inputTodo, setInputTodo] = useState("");
    const [todoList, setTodoList] = useState("");
    // 할일 입력받기
    const onChange = (e) => {

    }

    // 투두 리스트 출력하기

    return(
        <>
            <h2 className={style.todoTitle}>Todo</h2>
            <div className={style.todoCont}>
                <input type="text" onChange={onChange} className={style.inputTodo} placeholder="할 일을 기록하세요"></input>
                <div className={style.todoList}></div>
            </div>
            <div className={style.todoList}>
                <ul>
                    <li>
                        <input type="checkbox" id="todo1" className={style.screenReader}/>
                        <div className={style.labelBox}>
                            <span className={style.checkIcon} aria-hidden="true"></span>
                            <label for="todo1">할일</label>
                        </div>
                        <div className={style.menu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </li>
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