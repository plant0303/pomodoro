// 투두 메뉴 출력
import React, { useEffect, useRef, useState } from 'react';
import style from '../css/Todo/Todo.module.scss';
import TodoItem from './TodoItem';
import { Todo, TodoListProps } from '../types/todo';


function TodoListPrint({ todoList, setTodoList, onDeleteClick }: TodoListProps) {
    // const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    
    const handleUpdateTodo = (todoId: number, trimmed: string) => {
        // 수정 로직
        const updateList = todoList.map((todo) =>
            todo.id === todoId ? { ...todo, todo: trimmed } : todo
        );

        setTodoList(updateList);

    }


    return (
        <div className={style.todoList}>
            <ul>
                {todoList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={onDeleteClick}
                        onUpdate={handleUpdateTodo}
                        isEditing={editingId == todo.id}
                        startEditing={() => setEditingId(todo.id)}
                        stopEditing={() => setEditingId(null)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoListPrint;