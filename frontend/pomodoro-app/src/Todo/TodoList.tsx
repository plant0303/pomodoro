import React, { useEffect, useRef, useState } from "react";

// ts
import { Todo, TodoListProps } from '../types/todo'; 

//css
import style from "../css/Todo/Todo.module.scss";

import TodoInput from './TodoInout';
import TodoListPrint from "./TodoListPrint";


function TodoList({ todoList, setTodoList, onDeleteClick }: TodoListProps) {

    return (
        <>
            <h2 className={style.todoTitle}>Todo</h2>
            <TodoInput todoList={todoList} setTodoList={setTodoList}></TodoInput>
            <TodoListPrint todoList={todoList} setTodoList={setTodoList} onDeleteClick={onDeleteClick}></TodoListPrint>
            {/*
            키보드 단축키 편의성 - esc키 눌러서 모달 끄기
            타이틀에 초 띄우기
            투두 로컬스토리지에 저장하기
            투두 수정하고 아무곳이나 누르면 수정 완료되게
            투두리스트 드래그로 위치 조절
            삭제 누르면 completed 변경시키기
            뽀모도로 튜토리얼<br></br> */}
        </>
    );
}

export default TodoList;