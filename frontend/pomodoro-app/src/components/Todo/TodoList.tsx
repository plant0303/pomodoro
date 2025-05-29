import React, { useEffect, useRef, useState } from "react";

// ts
import { Todo } from '../../types/todo';

//css
import style from "../../css/Todo/Todo.module.scss";

import TodoInput from './TodoInout';
import TodoListPrint from "./TodoListPrint";

interface TodoListProps {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  onDeleteClick: (id: number) => void;
  onToggleComplete: (id: number) => void
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

            기능 추가 구현
            뽀모도로 튜토리얼
            타이머 로컬스토리지 저장
            타이머 루틴 기능 개발
            ---
            투두 목표량 달성 기능 추가
            */}
        </>
    );
}

export default TodoList;