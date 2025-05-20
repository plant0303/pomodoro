import React, { useEffect, useRef, useState } from 'react';
import style from '../css/Todo/Todo.module.scss';
import { Todo, TodoListProps } from '../types/todo';

interface TodoUpdateProps {
  todo: Todo;
  onUpdate: (id: number, trimmed: string) => void;
  isEditing: boolean;
  stopEditing: () => void;
  itemRef: React.RefObject<HTMLLIElement | null>;
}

function TodoUpdate({ todo, onUpdate, stopEditing, isEditing, itemRef}: TodoUpdateProps) {
  const [updateTodo, setUpdateTodo] = useState<string>(todo.todo); // 투두 수정
  const inputRef = useRef<HTMLInputElement>(null); // 수정 input에 자동 포커스
  const pastTodo = todo.todo;

  // 수정 저장 로직
  const handleSave = () => {
    const trimmed = updateTodo.trim();

    if (trimmed === "") {
      onUpdate(todo.id, pastTodo); // 원래 값으로 복구
    } else {
      onUpdate(todo.id, trimmed);  // 수정된 값 저장
    }

    stopEditing(); // 공통 처리

  }

  // enter 입력시 저장
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(1);
      handleSave();
    }
  }

  // 여백 클릭시 저장
  useEffect(() => {
    if (!isEditing) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        itemRef.current &&
        !itemRef.current.contains(e.target as Node)
      ) {
        handleSave();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.addEventListener("mousedown", handleClickOutside);
  });

  // 수정영역 input 자동 포커스
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);


  return (
    <div className={style.labelBox}>
      <span className={style.checkIcon} aria-hidden="true"></span>
      <input type="text"
        onChange={(e) => setUpdateTodo(e.target.value)}
        value={updateTodo}
        onKeyDown={handleKeyDown}
        ref={inputRef}></input>
    </div>
  )
}

export default TodoUpdate
