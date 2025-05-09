// 투두 메뉴 출력
import React, { useEffect, useRef, useState } from 'react';
import style from '../css/Todo/Todo.module.scss';
import TodoItem from './TodoItem';
import { Todo, TodoListProps } from '../types/todo';


function TodoListPrint({ todoList, setTodoList, onDeleteClick }: TodoListProps) {
    const [updateTodoId, setUpdateTodoId] = useState<number | null>(null);
    const [updateTodo, setUpdateTodo] = useState<string>(""); // 투두 수정
    const menuRef = useRef<{ [key: number]: HTMLDivElement | null }>({}); // 클릭 감지
    const [openMenuId, setOpenMenuId] = useState<number | null>(null); // 두투 메뉴 오픈 상태

    // todo 수정
    const onUpdateClick = (id: number) => {
        setUpdateTodoId(id);

    }

    const handleUpdateTodo = (e: React.KeyboardEvent<HTMLInputElement>, todoId: number) => {
        console.log(todoId);
        if (e.key === "Enter") {
            const trimmed = updateTodo.trim();
            // 공백만 있을 경우
            if (trimmed === "") {
                return;
            }

            // 수정 로직
            const updateList = todoList.map((todo) =>
                todo.id === todoId ? { ...todo, todo: trimmed } : todo
            );

            setTodoList(updateList);
            setUpdateTodoId(null);
        }
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
                        todo={todo}
                        menu={{
                            ref: menuRef,
                            isOpen: openMenuId === todo.id,
                            toggle: toggleMenu
                        }}
                        edit={{
                            isEditing: updateTodoId === todo.id,
                            text: updateTodo,
                            onChange: setUpdateTodo,
                            onKeyDown: handleUpdateTodo,
                            onStartEdit: onUpdateClick
                        }}
                        onDelete={onDeleteClick}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoListPrint;