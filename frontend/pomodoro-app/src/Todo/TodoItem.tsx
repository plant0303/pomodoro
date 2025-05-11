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
}

function TodoItem({ todo, onDelete, onUpdate, isEditing, startEditing, stopEditing }: TodoItemProps) {
    const [updateTodo, setUpdateTodo] = useState<string>(""); // 투두 수정
    const inputRef = useRef<HTMLInputElement>(null); // 수정 input에 자동 포커스


    const handleUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const trimmed = updateTodo.trim();
            // 공백만 있을 경우
            if (trimmed === "") return;

            onUpdate(todo.id, trimmed);
            stopEditing();
        }
    }


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
            <TodoMenu todoId={todo.id} setIsEditing={startEditing} onDelete={onDelete}/>
        </li>
    );
}

export default TodoItem;