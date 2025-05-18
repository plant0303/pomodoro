import React, { useEffect, useRef, useState } from 'react';
import style from '../css/Todo/Todo.module.scss';
import { Todo, TodoListProps } from '../types/todo';
import TodoMenu from './TodoMenu';

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
    onUpdate: (id: number, trimmed: string) => void;
    isEditing: boolean;
    startEditing: () => void;
    stopEditing: () => void;
    listRef: React.RefObject<HTMLDivElement | null>;
}

function TodoItem({ todo, onDelete, onUpdate, isEditing, startEditing, stopEditing, listRef }: TodoItemProps) {
    const [updateTodo, setUpdateTodo] = useState<string>(todo.todo); // 투두 수정
    const inputRef = useRef<HTMLInputElement>(null); // 수정 input에 자동 포커스
    const pastTodo = todo.todo;

    const handleUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const trimmed = updateTodo.trim();

            if (trimmed === "") {
                onUpdate(todo.id, pastTodo); // 원래 값으로 복구
            } else {
                onUpdate(todo.id, trimmed);  // 수정된 값 저장
            }

            stopEditing(); // 공통 처리
        }
    }

    // 수정영역 input 자동 포커스
    useEffect(() => {
        if(isEditing && inputRef.current){
            inputRef.current.focus();
        }
    }, [isEditing]);

    return (
        <li key={`todo${todo.id}`} className={style.todoLi}>
            <input type="checkbox"
                id={`todo-${todo.id}`}
                className={style.screenReader} />
            {isEditing ?
                <div className={style.labelBox}>
                    <span className={style.checkIcon} aria-hidden="true"></span>
                    <input type="text"
                        onChange={(e) => setUpdateTodo(e.target.value)}
                        value={updateTodo}
                        onKeyDown={(e) => handleUpdate(e)}
                        ref={inputRef}></input>
                </div> :
                <div className={style.labelBox}>
                    <span className={style.checkIcon} aria-hidden="true"></span>
                    <label htmlFor={`todo-${todo.id}`}>{todo.todo}</label>
                </div>
            }
            <TodoMenu todoId={todo.id} setIsEditing={startEditing} onDelete={onDelete} listRef={listRef}/>
        </li>
    );
}

export default TodoItem;