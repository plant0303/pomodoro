import React, { useState, useEffect } from "react";
import style from "../css/Timer/PomodoroTimer.module.scss";
const PomodoroTimer = ({ initialMinutes = 20 }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const strokeDashoffset = circumference - (timeLeft / 3600) * circumference;

  return (
    <>
      <div className={style.timerCont}>
        <svg viewBox="0 0 120 120">
          <defs>
            <linearGradient id="grad" x1="0%" y1="100%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#ffd455" />
              <stop offset="100%" stopColor="#ff4500" />
            </linearGradient>
          </defs>
          <circle
            className={style.timerBackground}
            cx="60"
            cy="60"
            r={radius}
          />
          <circle
            className={style.timerStroke}
            cx="60"
            cy="60"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className={style.time}>
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      </div>
      <button className={style.timerBtn} onClick={() => setIsRunning((prev) => !prev)}>
        {isRunning ? "일시정지" : "시작하기"}
      </button>
    </>
  );
};

export default PomodoroTimer;
