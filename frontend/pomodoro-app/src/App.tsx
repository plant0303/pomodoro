import React, { useEffect, useState } from "react";
import "./default.css";
import "./main.css";
import useTodo from "./hooks/useTodo";
import PomodoroTimer from "./Timer/PomodoroTimer";
import TodoList from "./Todo/TodoList";
import DeleteModal from "./Todo/DeleteModal";
import Joyride from "react-joyride";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

function App() {

  const {
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
  } = useTodo();

  // ESC
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

  // 튜토리얼 열기 버튼
  const handleTutorial = () => {
    setRunTutorial(true);
    console.log(runTutorial);
  }

  return (
    <div className="body">
      <Joyride
        steps={[
          {
            target: '.PomodoroTimer_startButton__3fwQn',
            content: 'click'
          }
        ]}
        run={runTutorial}
        continuous
        showSkipButton
        disableScrolling={true}
        styles={{
          options: {
            zIndex: 1000,
          },
        }}
        callback={(data) => {
          if (data.status === "finished" || data.status === "skipped") {
            setRunTutorial(false);
          }
        }}
      ></Joyride>
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
      <div className="tutorial" onClick={handleTutorial}>
        <span className="tutorial_btn">?</span>
      </div>
      {showDeleteModal == true &&
        <DeleteModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete}></DeleteModal>}
    </div>
  );
}

export default App;
