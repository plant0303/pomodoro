import React, { useState } from "react";
import "./default.css";
import "./main.css";
import PomodoroTimer from "./Timer/PomodoroTimer";
import TodoList from "./Todo/TodoList";
import DeleteModal from "./Todo/DeleteModal";

interface Todo {
  id: number;
  todo: String;
}

function App() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todoList, setTodoList] = useState([
      { id: 1, todo: "할일1" },
      { id: 2, todo: "할일2" },
      { id: 3, todo: "할일3" }
  ]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  
  const handleDeleteRequest = (id: number) => {
    setShowDeleteModal(true);
    setSelectedTodoId(id);
  }

  // 삭제 모달
  const handleConfirmDelete =() => {
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
    if(selectedTodoId !== null){

    }
  }

  return (
    <div className="body">
      <header className="header">
        <h1>Pomodoro</h1>
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
          <TodoList todoList={todoList} setTodoList={setTodoList} onDeleteClick={handleDeleteRequest}></TodoList>
        </div>
      </div>

      {showDeleteModal == true && 
      <DeleteModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete}></DeleteModal>}
    </div>
  );
}

export default App;
