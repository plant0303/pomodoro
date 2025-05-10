import React, { useState } from 'react';
import style from '../css/Todo/Todo.module.scss';
import { Todo, TodoListProps } from '../types/todo';
// import TodoMenu from './TodoMenu';

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
    // onUpdate: (id: number, text: string) => void;
}

function TodoItem({ todo, onDelete }: TodoItemProps) {
    const [updateTodoId, setUpdateTodoId] = useState<number | null>(null);
    const [updateTodo, setUpdateTodo] = useState<string>(""); // 투두 수정
    const [isEditing, setIsEditing] = useState(false);
    // todo 수정
    const onUpdateClick = (id: number) => {
        setUpdateTodoId(id);

    }

    const handleUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const trimmed = updateTodo.trim();
            // 공백만 있을 경우
            if (trimmed === "") {
                return;
            }

            // onUpdate(todo.id, trimmed);
            setUpdateTodoId(null);
        }
    }


    return (
        <li key={`todo${todo.id}`} className={style.todoLi}>
            <input type="checkbox"
                id={`todo-${todo.id}`}
                className={style.screenReader} />
            {isEditing === true ?
                <div className={style.labelBox}>
                    <span className={style.checkIcon} aria-hidden="true"></span>
                    <input type="text"
                        onChange={(e) => setUpdateTodo(e.target.value)}
                        value={updateTodo}
                        onKeyDown={(e) => handleUpdate(e)}></input>
                </div> :
                <div className={style.labelBox}>
                    <span className={style.checkIcon} aria-hidden="true"></span>
                    <label htmlFor={`todo-${todo.id}`}>{todo.todo}</label>
                </div>
            }
            {/* <TodoMenu /> */}

        </li>
    );
}

export default TodoItem;