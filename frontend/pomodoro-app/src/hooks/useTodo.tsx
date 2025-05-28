import React, { useEffect, useState } from "react";

interface Todo {
    id: number;
    todo: string;
    completed: boolean;
}

function useTodo() {

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
    const [runTutorial, setRunTutorial] = useState<boolean>(false);

    const [todoList, setTodoList] = useState<Todo[]>(() => {
        const data = localStorage.getItem('todo');
        return data ? JSON.parse(data) : [];
    });


    // 투두 완료상태 토글
    const onToggleComplete = (id: number) => {
        console.log(id);
        // Todo 에서 id와 일치하는 todo의 complated 상태를 변경해야함
        setTodoList(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }

    // 삭제 모달 요청
    const handleConfirmDelete = () => {
        if (selectedTodoId !== null) {
            setTodoList(todoList.filter((todo) => todo.id !== selectedTodoId));
            setSelectedTodoId(null);
        }
        setShowDeleteModal(false);
    }

    // 삭제 요청
    const handleDeleteRequest = (id: number) => {
        console.log(id);
        setShowDeleteModal(true);
        setSelectedTodoId(id);
    }

    // 삭제 취소
    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    }

    useEffect(() => {
        const hasVisited = localStorage.getItem("hasVisited");

        // 처음 실행할 때
        if (!hasVisited) {
            const defaultTodos: Todo[] = [
                { id: 1, todo: "이번 세션동안 진행할 일을 기록해보세요.", completed: false }
            ];

            localStorage.setItem("todo", JSON.stringify(defaultTodos));
            localStorage.setItem("hasVisited", "true");
            setTodoList(defaultTodos);
        }

        // joyride 처음 실행할때 
        if (!hasVisited) {
            setRunTutorial(true);
            localStorage.setItem("hasVisited", "true");
        }
    }, []);

    return {
        todoList,
        setTodoList,
        showDeleteModal,
        setShowDeleteModal,
        setRunTutorial,
        runTutorial,
        handleDeleteRequest,
        onToggleComplete,
        handleConfirmDelete,
        handleCancelDelete
    }
}

export default useTodo;