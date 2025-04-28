import React, { useState }from "react";
import style from "../css/Todo/Todo.module.scss";

function TodoList() {
    const [inputTodo, setInputTodo] = useState("");

    const onChange = (e) => {

    }

    return(
        <div>
            <input type="text" onChange={onChange} className={style.inputTodo} placeholder="할 일을 기록하세요"></input>
            {/* 투두<br></br>
            타이머 숫자 60 이상 안넘게<br></br>
            타이머 끝나면 알람 가도록<br></br>
            뽀모도로 튜토리얼<br></br> */}
        </div>
    );
}

export default TodoList;