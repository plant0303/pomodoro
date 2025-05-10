// 투두 메뉴 출력
import React, { useEffect, useRef, useState } from 'react';
import style from '../css/Todo/Todo.module.scss';
import TodoItem from './TodoItem';
import { Todo, TodoListProps } from '../types/todo';


function TodoListPrint({ todoList, setTodoList, onDeleteClick }: TodoListProps) {

    const menuRef = useRef<{ [key: number]: HTMLDivElement | null }>({}); // 클릭 감지
    const [openMenuId, setOpenMenuId] = useState<number | null>(null); // 두투 메뉴 오픈 상태

    const handleUpdateTodo = (todoId: number, trimmed: string) => {
        // 수정 로직
        const updateList = todoList.map((todo) =>
            todo.id === todoId ? { ...todo, todo: trimmed } : todo
        );

        setTodoList(updateList);

    }

    // 투두 리스트 햄버거 메뉴 출력
    const toggleMenu = (id: number) => {
        setOpenMenuId((prevId) => (prevId === id ? null : id));
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (openMenuId !== null && menuRef.current && !menuRef.current[openMenuId]?.contains(e.target as Node)) {
                setOpenMenuId(null);
            }
        };


        document.addEventListener("mousedown", handleClickOutside);

        // 클린업 함수
        // 컴포넌트가 언마운트 되거나 의존성 배열 값이 변경될 때 실행됨
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // 의존성배열 []
        // openMenuId가 변경될때마다 실행되도록 제어
    }, [openMenuId]);


    return (
        <div className={style.todoList}>
            <ul>
                {todoList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={onDeleteClick}
                        onUpdate={handleUpdateTodo}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoListPrint;