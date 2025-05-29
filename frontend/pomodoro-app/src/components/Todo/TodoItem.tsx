import React, { useEffect, useRef, useState } from 'react';
import style from '../../css/Todo/Todo.module.scss';
import { Todo, TodoListProps } from '../../types/todo';
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
    onDropTodo: (fromId: number, toId: number) => void;
    dragOverId: number | null;
    setDragOverId: React.Dispatch<React.SetStateAction<number | null>>;
    onToggleComplete: (id: number) => void;
}

function TodoItem({ todo, onDelete, onUpdate, isEditing, startEditing, stopEditing, listRef, onDropTodo, dragOverId, setDragOverId, onToggleComplete }: TodoItemProps) {

    const itemRef = useRef<HTMLLIElement | null>(null);
    const checkTodo = useState<boolean>(false);


    // 투두 드래그
    // 드래그 시작
    const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
        const startId = e.dataTransfer.setData("text/plain", String(todo.id)); // 드래그 중인 아이템 id 저장하기
    }

    // 드래그 중
    const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
        setDragOverId(todo.id);
    };

    // 드래그 끝
    const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
        const draggedId = Number(e.dataTransfer.getData("text/plain"));
        const targetId = todo.id;
        setDragOverId(null);
        // 이 두 id를 상위 컴포넌트로 전달
        onDropTodo(draggedId, targetId);
    };


    return (
        <li
            data-id={todo.id}
            ref={itemRef}
            draggable='true'
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`${style.todoLi} ${dragOverId === todo.id ? style.dragOver : ""}`}
        >
            <input type="checkbox"
                id={`todo-${todo.id}`}
                className={style.screenReader} 
                checked={todo.completed}
                onChange={() => onToggleComplete(todo.id)}/>
            {isEditing ?
                <TodoUpdate todo={todo} onUpdate={onUpdate} isEditing={isEditing} stopEditing={stopEditing} itemRef={itemRef} /> :
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