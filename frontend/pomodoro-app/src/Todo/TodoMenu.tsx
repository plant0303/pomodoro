// 투두 햄버거 메뉴
import React, { useEffect, useRef, useState } from 'react'

import style from '../css/Todo/Todo.module.scss';
import { Todo, TodoListProps } from '../types/todo';

interface TodoMenu{
  todoId: number;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: (id: number) => void;
}

function TodoMenu({ todoId, setIsEditing, onDelete }: TodoMenu) {
  const menuRef = useRef<{ [key: number]: HTMLDivElement | null }>({}); // 클릭 감지
  const [openMenuId, setOpenMenuId] = useState<number | null>(null); // 두투 메뉴 오픈 상태
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



  // 햄버거 메뉴 버튼 
  const MenuIcon = () => {
    return (
      <>
        <span></span>
        <span></span>
        <span></span>
      </>
    );
  }

  return (
    <div
      ref={(el) => { menuRef.current[todoId] = el; }}
      className={style.menuWrapper}
    >
      <div className={style.menu}
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu(todoId);
        }}
        tabIndex={0}
        role="button">
        <MenuIcon></MenuIcon>
      </div>
      {openMenuId === todoId &&
        <div className={style.menuPopup} >
          <ul>
            <li><button onClick={() => { setIsEditing(true); toggleMenu(todoId) }}>수정</button></li>
            <li><button onClick={() => { onDelete(todoId); toggleMenu(todoId); }}>삭제</button></li>
          </ul>
        </div>
      }
    </div>
  )
}

export default TodoMenu
