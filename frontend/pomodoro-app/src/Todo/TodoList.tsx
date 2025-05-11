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
            <TodoInput
                todoList={todoList}
                setTodoList={setTodoList} />
            <TodoListPrint
                todoList={todoList}
                setTodoList={setTodoList}
                onDeleteClick={onDeleteClick} />
            {/*
            편의성 패치
            키보드 단축키 편의성 - esc키 눌러서 모달 끄기
            투두 수정하고 아무곳이나 누르면 수정 완료되게
            투두 수정 누르고 input에 포커스 넣어주기
            투두리스트 드래그로 위치 조절

            기능 추가 구현
            한번에 하나씩만 수정하기
            디자인 변경
            타이틀에 초 띄우기
            삭제 누르면 completed 변경시키기
            뽀모도로 튜토리얼
            
            */}
        </>
    );
}

export default TodoList;