import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import style from "../css/Todo/Todo.module.scss";
import { compileString } from "sass";

interface TodoMenuProps {
  todoId: number;
  setIsEditing: (editing: boolean) => void;
  onDelete: (id: number) => void;
  listRef: React.RefObject<HTMLDivElement | null>;
}

function TodoMenu({ todoId, setIsEditing, onDelete, listRef }: TodoMenuProps) {
  const menuRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const menuPopupRef = useRef<HTMLDivElement | null>(null); // 메뉴 팝업 ref
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [openUpward, setOpenUpward] = useState<boolean>(false);

  const toggleMenu = (id: number) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };

  // 메뉴 위치 판단 (렌더링 직후)
  useLayoutEffect(() => {
    if (openMenuId !== null && listRef.current && menuPopupRef.current) {
      const menuRect = menuPopupRef.current.getBoundingClientRect();
      const containerRect = listRef.current.getBoundingClientRect();

      const spaceBelow = containerRect.bottom - menuRect.bottom; // 아래 여유 공간
      const spaceAbove = menuRect.top - containerRect.top; // 위 여유 공간
      const MENU_HEIGHT = menuRect.height || 100;

      setOpenUpward(spaceBelow < MENU_HEIGHT && spaceAbove > MENU_HEIGHT);
    }
  }, [openMenuId]);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openMenuId !== null &&
        menuRef.current[openMenuId] &&
        !menuRef.current[openMenuId]?.contains(e.target as Node)
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  const MenuIcon = () => (
    <>
      <span></span>
      <span></span>
      <span></span>
    </>
  );

  return (
    <div
      ref={(el) => {
        menuRef.current[todoId] = el;
      }}
      className={style.menuWrapper}
    >
      <div
        className={style.menu}
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu(todoId);
        }}
        tabIndex={0}
        role="button"
      >
        <MenuIcon />
      </div>

      {openMenuId === todoId && (
        <div
          ref={menuPopupRef}
          className={style.menuPopup}
          style={openUpward ? { bottom: "100%" } : { top: "100%" }}
        >
          <ul>
            <li>
              <button
                onClick={() => {
                  setIsEditing(true);
                  toggleMenu(todoId);
                }}
              >
                수정
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onDelete(todoId);
                  toggleMenu(todoId);
                }}
              >
                삭제
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default TodoMenu;
