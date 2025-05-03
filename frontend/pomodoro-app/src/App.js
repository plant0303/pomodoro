import React, { useState } from "react";
import logo from "./logo.svg";
import "./default.css";
import "./main.css";
import PomodoroTimer from "./Timer/PomodoroTimer";
import PomodoroTimerTest from './Timer/PomodoroTimerTest';
import TodoList from "./Todo/TodoList";
import DeleteModal from "./Todo/DeleteModal";

function App() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteRequest = () => {
    setShowDeleteModal(true);
  }

  const handleConfirmDelete =() => {
    setShowDeleteModal(false);
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
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
          <TodoList onDeleteClick={handleDeleteRequest}></TodoList>
        </div>
      </div>

      {showDeleteModal == true && 
      <DeleteModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete}></DeleteModal>}

    </div>
  );
}

export default App;
