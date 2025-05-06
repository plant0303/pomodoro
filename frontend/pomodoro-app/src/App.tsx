import React, { useState } from "react";
import "./default.css";
import "./main.css";
import PomodoroTimer from "./Timer/PomodoroTimer";
import TodoList from "./Todo/TodoList";
import DeleteModal from "./Todo/DeleteModal";

function App() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  
  const handleDeleteRequest = (id: number) => {
    setShowDeleteModal(true);
    setSelectedTodoId(id);
  }

  // 삭제 모달
  const handleConfirmDelete =() => {
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

  console.log(selectedTodoId);
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
          <TodoList onDeleteClick={handleDeleteRequest}></TodoList>
        </div>
      </div>

      {showDeleteModal == true && 
      <DeleteModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete}></DeleteModal>}

    </div>
  );
}

export default App;
