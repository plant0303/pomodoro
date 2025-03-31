import React, { useState, useEffect } from "react";
import style from "../css/Timer/PomodoroTimer.module.scss";
const PomodoroTimer = () => {
  const initialMinutes = 40;
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  // 눈금
  const tickMarks = Array.from({ length: 60 }, (_, i) => {
    const angle = (i / 60) * 360;
    // 0, 15, 30, 45에 굵은 마커 생성
    return i % 15 == 0 ? (
      <line
        key={i}
        x1="60"
        y1="18"
        x2="60"
        y2="15"
        stroke="#ccc"
        strokeWidth="0.8"
        transform={`rotate(${angle} 60 60)`}
      />
    ) : (
      <line
        key={i}
        x1="60"
        y1="17"
        x2="60"
        y2="15"
        stroke="#ccc"
        strokeWidth="0.2"
        transform={`rotate(${angle} 60 60)`}
      />
    );
  });

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
          {tickMarks}
        </svg>

        <div className={style.time}>
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      </div>
      <button
        className={`${style.timerBtn} ${isRunning ? style.pause : style.start}`}
        onClick={() => setIsRunning((prev) => !prev)}
      >
        {isRunning ? "일시정지" : "시작하기"}
      </button>
    </>
  );
};

export default PomodoroTimer;
