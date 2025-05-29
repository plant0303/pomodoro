// 새로운 투두 입력받기
import React, { useEffect, useState } from "react"
import style from "../../css/Todo/Todo.module.scss"
interface Todo {
    id: number;
    todo: string;
    completed: boolean;
}

interface TodoListProps {
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function 
TodoInput({ todoList, setTodoList }: TodoListProps) {
    const [inputTodo, setInputTodo] = useState<string>("");

    // 로컬스토리지 저장
    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todoList));
    }, [todoList]);

    //투두 입력받기
    const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputTodo.trim() !== "") {
            const newTodoList = {
                id: todoList.length + 1,
                todo: inputTodo.trim(),
                completed: false
            };

            // 투두 리스트 저장
            setTodoList([...todoList, newTodoList]);

            // 입력창 비우기 
            setInputTodo("");
        }
    }

    return (
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