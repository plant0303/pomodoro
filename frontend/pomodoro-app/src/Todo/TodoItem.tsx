import React, { useEffect, useRef, useState } from 'react';
import style from '../css/Todo/Todo.module.scss';
import { Todo, TodoListProps } from '../types/todo';
import TodoMenu from './TodoMenu';
import TodoUpdate from './TodoUpdate';

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

    const itemRef = useRef<HTMLLIElement | null>(null);

    return (
        <li ref={itemRef} key={`todo${todo.id}`} className={style.todoLi} draggable='true'>
            <input type="checkbox"
                id={`todo-${todo.id}`}
                className={style.screenReader} />
            {isEditing ?
                <TodoUpdate todo={todo} onUpdate={onUpdate} isEditing={isEditing} stopEditing={stopEditing} itemRef={itemRef}/> :
                <div className={style.labelBox}>
                    <span className={style.checkIcon} aria-hidden="true"></span>
                    <label htmlFor={`todo-${todo.id}`}>{todo.todo}</label>
                </div>
            }
            <TodoMenu todoId={todo.id} setIsEditing={startEditing} onDelete={onDelete} listRef={listRef} />
        </li>
    );
}

export default TodoItem;