import logo from './logo.svg';
import './default.css';
import './main.css';
import PomodoroTimer from './Timer/PomodoroTimer';
import TodoList from './Todo/TodoList';
function App() {
  return (
    <div className="cont">
      <div className="timer">
        <PomodoroTimer></PomodoroTimer>
      </div>
      <div className="todo">
        <TodoList></TodoList>
      </div>
    </div>
  );
}

export default App;
