// 투두 메뉴 출력
import React, { useEffect, useRef, useState, Ref } from 'react';
import style from '../css/Todo/Todo.module.scss';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

interface TodoListProps {
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
    onDeleteClick: (id: number) => void;
    onToggleComplete: (id: number) => void;
}

function TodoListPrint({ todoList, setTodoList, onDeleteClick, onToggleComplete }: TodoListProps) {
    // const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);
    const [dragOverId, setDragOverId] = useState<number | null>(null);

    const handleUpdateTodo = (todoId: number, trimmed: string) => {
        // 수정 로직
        const updateList = todoList.map((todo) =>
            todo.id === todoId ? { ...todo, todo: trimmed } : todo
        );

        setTodoList(updateList);

    }

    // 드래그 앤 드롭 순서 바꾸기
    const onDropTodo = (fromId: number, toId: number) => {
        setTodoList((prevTodos) => {
            const fromIndex = prevTodos.findIndex(todo => todo.id === fromId);
            const toIndex = prevTodos.findIndex(todo => todo.id === toId);

            if (fromIndex === -1 || toIndex === -1) return prevTodos;

            const updatedTodos = [...prevTodos];
            const [movedItem] = updatedTodos.splice(fromIndex, 1);
            updatedTodos.splice(toIndex, 0, movedItem);

            return updatedTodos;
        });
    };


    return (
        <div className={style.todoList} ref={listRef}>
            <ul>
                {todoList.length === 0 ? <span className={style.todoNull}>작성된 todo가 없습니다</span>
                    : todoList.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={onDeleteClick}
                            onUpdate={handleUpdateTodo}
                            isEditing={editingId == todo.id}
                            startEditing={() => setEditingId(todo.id)}
                            stopEditing={() => setEditingId(null)}
                            listRef={listRef}
                            onDropTodo={onDropTodo}
                            dragOverId={dragOverId}
                            setDragOverId={setDragOverId}
                            onToggleComplete={onToggleComplete}
                        />
                    ))}
            </ul>
        </div>
    );
}

export default TodoListPrint;