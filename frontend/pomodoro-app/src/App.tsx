import React, { useEffect, useState } from "react";
import "./default.css";
import "./main.css";
import PomodoroTimer from "./Timer/PomodoroTimer";
import TodoList from "./Todo/TodoList";
import DeleteModal from "./Todo/DeleteModal";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

function App() {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const data = localStorage.getItem('todo');
    return data ? JSON.parse(data) : [];
  });
  const [checkTodo, setCheckTodo] = useState<boolean>(false);

  const onToggleComplete = (id: number) => {
    // Todo 에서 id와 일치하는 todo의 complated 상태를 변경해야함
    setTodoList(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed} : todo))

  }

  
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      const defaultTodos: Todo[] = [
        { id: 1, todo: "이번 세션동안 진행할 일을 기록해보세요.", completed: false }
      ];

      localStorage.setItem("todo", JSON.stringify(defaultTodos));
      localStorage.setItem("hasVisited", "true");
      setTodoList(defaultTodos);
    }
  }, []);

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowDeleteModal(false);
    }
  };

  if (showDeleteModal) {
    window.addEventListener('keydown', handleKeyDown);
  }

  return () => {
    // showDeleteModal이 false가 되거나 컴포넌트가 언마운트 될 때 이벤트 제거
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [showDeleteModal]);

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const handleDeleteRequest = (id: number) => {
    setShowDeleteModal(true);
    setSelectedTodoId(id);
  }


  // 삭제 모달
  const handleConfirmDelete = () => {
    if (selectedTodoId !== null) {
      setTodoList(todoList.filter((todo) => todo.id !== selectedTodoId));
      setSelectedTodoId(null);
    }
    setShowDeleteModal(false);
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  }

  // todo 삭제
  const confirmDelete = () => {
    if (selectedTodoId !== null) {

    }
  }

  return (
    <div className="body">
      <header className="header">
        <h1>TodoMoro</h1>
        <div className="more">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <div className="cont">
        <div className="timer">
          <PomodoroTimer></PomodoroTimer>
        </div>
        <div className="todo">
          <TodoList
            todoList={todoList}
            setTodoList={setTodoList}
            onDeleteClick={handleDeleteRequest}
            onToggleComplete={onToggleComplete}
          />
        </div>
      </div>

      {showDeleteModal == true &&
        <DeleteModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete}></DeleteModal>}
    </div>
  );
}

export default App;
