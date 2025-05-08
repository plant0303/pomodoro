import React, { useEffect, useRef, useState } from "react";
import global from "../global.scss"
import style from "../css/Todo/Todo.module.scss";

interface Todo {
    id: number;
    todo: string;
    completed: boolean;
}

interface TodoListProps {
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
    onDeleteClick: (id: number) => void;
}

function TodoList({ todoList, setTodoList, onDeleteClick }: TodoListProps) {

    const [inputTodo, setInputTodo] = useState("");

    const [openMenuId, setOpenMenuId] = useState<number | null>(null); // 두투 메뉴 오픈 상태
    const menuRef = useRef<{ [key: number]: HTMLDivElement | null }>({}); // 클릭 감지
    
    const [updateTodoId, setUpdateTodoId] = useState<number | null>(null);
    const [updateTodo, setUpdateTodo] = useState<string>(""); // 투두 수정

    //투두 입력받기
    const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputTodo.trim() !== "") {
            const newTodoList = {
                id: todoList.length + 1,
                todo: inputTodo.trim(),
                completed: false
            };

            setTodoList([...todoList, newTodoList]);
            setInputTodo("");
        }
    }

    // 투두 리스트 햄버거 메뉴 출력
    const toggleMunu = (id: number) => {
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


    // todo 수정
    const onUpdateClick = (id: number) => {
        setUpdateTodoId(id);

    }

    const handleUpdateTodo = (e: React.KeyboardEvent<HTMLInputElement>, todoId: number) => {
        console.log(todoId);
        if(e.key === "Enter") {
            const trimmed = updateTodo.trim();
            // 공백만 있을 경우
            if(trimmed === ""){
                return;
            }

            // 수정 로직
            const updateList = todoList.map((todo) => 
                todo.id === todoId ? { ...todo, todo:trimmed } : todo
            );

            setTodoList(updateList);
            setUpdateTodoId(null);
        }
    }

    // 투두 리스트 출력하기
    const printTodo = todoList.map((todo) => {
        return (
            <li className={style.todoLi}>
                <input type="checkbox"
                    id={`todo-${todo.id}`}
                    className={style.screenReader} />
                {updateTodoId === todo.id ?
                    <div className={style.labelBox}>
                        <span className={style.checkIcon} aria-hidden="true"></span>
                        <input type="text" 
                        onChange={(e) => setUpdateTodo(e.target.value)} 
                        value={updateTodo}
                        onKeyDown={(e) => handleUpdateTodo(e, todo.id)}></input>
                    </div>    :
                    <div className={style.labelBox}>
                        <span className={style.checkIcon} aria-hidden="true"></span>
                        <label htmlFor={`todo-${todo.id}`}>{todo.todo}</label>
                    </div>              
                }
                <div
                    ref={(el) => { menuRef.current[todo.id] = el; }}
                    className={style.menuWrapper}
                >
                    <div className={style.menu}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleMunu(todo.id);
                        }}
                        tabIndex={0}
                        role="button">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    {openMenuId === todo.id &&
                        <div className={style.menuPopup}>
                            <ul>
                                <li><button onClick={() => { onUpdateClick(todo.id); setOpenMenuId(null) }}>수정</button></li>
                                <li><button onClick={() => { onDeleteClick(todo.id); setOpenMenuId(null); }}>삭제</button></li>
                            </ul>
                        </div>
                    }
                </div>
            </li>
        );
    });



    return (
        <>
            <h2 className={style.todoTitle}>Todo</h2>
            <div className={style.todoCont}>
                <input type="text"
                    value={inputTodo}
                    onChange={(e) => setInputTodo(e.target.value)}
                    onKeyDown={(e) => activeEnter(e)}
                    className={style.inputTodo}
                    placeholder="할 일을 기록하세요"></input>
                <div className={style.todoList}></div>
            </div>
            <div className={style.todoList}>
                <ul>
                    {printTodo}
                </ul>
            </div>
            {/*
            키보드 단축키 편의성 - esc키 눌러서 모달 끄기
            타이틀에 초 띄우기
            투두 로컬스토리지에 저장하기
            투두리스트 드래그로 위치 조절
            투두리스트 삭제 수정
            뽀모도로 튜토리얼<br></br> */}
        </>
    );
}

export default TodoList;