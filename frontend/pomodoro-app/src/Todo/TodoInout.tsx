// 새로운 투두 입력받기
import React, { useState } from "react"
import style from "../css/Todo/Todo.module.scss"
interface Todo {
    id: number;
    todo: string;
    completed: boolean;
}

interface TodoListProps{
    todoList: Todo[];   
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function TodoInput({ todoList, setTodoList }: TodoListProps) {
    const [inputTodo, setInputTodo] = useState<string>("");

        //투두 입력받기
        const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && inputTodo.trim() !== "") {
                const newTodoList = {
                    id: todoList.length + 1,
                    todo: inputTodo.trim(),
                    completed: false
                };
    
                setTodoList([...todoList, newTodoList]);
                setInputTodo("");
            }
        }

    return(
        <div className={style.todoCont}>
        <input type="text"
            value={inputTodo}
            onChange={(e) => setInputTodo(e.target.value)}
            onKeyDown={(e) => activeEnter(e)}
            className={style.inputTodo}
            placeholder="할 일을 기록하세요"></input>
        <div className={style.todoList}></div>
    </div>
    )
}

export default TodoInput;