import React, { useEffect, useRef, useState } from "react";

// ts
import { Todo } from '../types/todo';

//css
import style from "../css/Todo/Todo.module.scss";

import TodoInput from './TodoInout';
import TodoListPrint from "./TodoListPrint";

interface TodoListProps {
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
    onDeleteClick: (id: number) => void;
    onToggleComplete: (id: number) => void;
}
function TodoList({ todoList, setTodoList, onDeleteClick, onToggleComplete }: TodoListProps) {

    return (
        <>
            <h2 className={style.todoTitle}>Todo</h2>
            <TodoInput
                todoList={todoList}
                setTodoList={setTodoList} />
            <TodoListPrint
                todoList={todoList}
                setTodoList={setTodoList}
                onDeleteClick={onDeleteClick} 
                onToggleComplete={onToggleComplete}/>
            {/*
            편의성 패치
            투두 수정하고 아무곳이나 누르면 수정 완료되게
            투두리스트 드래그로 위치 조절

            기능 추가 구현
            삭제 누르면 completed 변경시키기
            뽀모도로 튜토리얼
            투두 아무것도 없을때 내용 입력하라고 출력하기
            */}
        </>
    );
}

export default TodoList;