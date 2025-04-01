import React, { useState, useEffect } from "react";
import style from "../css/Timer/PomodoroTimer.module.scss";

const PomodoroTimer = () => {
  const initialMinutes = 40;
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [angle, setAngle] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  const tickMarks = Array.from({ length: 60 }, (_, i) => {
    const angle = (i / 60) * 360;
    return i % 15 === 0 ? (
      <line
        key={i}
        x1="60"
        y1="18"
        x2="60"
        y2="15"
        stroke="#ccc"
        strokeWidth="0.5"
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

  const strokeDashoffset = circumference - (Math.floor(timeLeft) / 3600) * circumference;

  //타이머 리셋
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialMinutes * 60);
  };
  
  const handleMouseDown = (e) => {
    if(isRunning) return
    setIsDragging(true);
    const centerX = 60;
    const centerY = 60;
    const mouseX = e.clientX - e.target.getBoundingClientRect().left;
    const mouseY = e.clientY - e.target.getBoundingClientRect().top;
    const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
    setAngle(angle);
  };

const handleMouseMove = (e) => {
  if (!isDragging) return;

  const centerX = 60;
  const centerY = 60;
  const mouseX = e.clientX - e.target.getBoundingClientRect().left;
  const mouseY = e.clientY - e.target.getBoundingClientRect().top;
  const newAngle = Math.atan2(mouseY - centerY, mouseX - centerX);
  const angleDifference = newAngle - angle;
  const minutesChange = (angleDifference / (2 * Math.PI)) * 60;

  setTimeLeft((prevTime) => Math.min(3600, Math.max(0, prevTime + minutesChange * 60))); // 60분 제한 적용

  setAngle(newAngle);
};

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div className={style.timerCont}>
        <svg
          className={`${!isRunning && style.svgStart}`}
          viewBox="0 0 120 120"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // 마우스가 SVG 영역을 벗어나면 드래그 종료
        >
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
      {isRunning ? (
        <div className={style.btnCont}>
          <button
            className={`${style.timerBtn} ${
              isRunning ? style.pause : style.start
            }`}
            onClick={() => setIsRunning((prev) => !prev)}
          >
            일시정지
          </button>
          <button
            className={`${style.timerBtn} ${
              isRunning ? style.pause : style.start
            }`}
            onClick={handleReset}
          >
            초기화
          </button>
        </div>
      ) : (
        <div className={style.btnCont}>
          <button
            className={`${style.timerBtn} ${
              isRunning ? style.pause : style.start
            }`}
            onClick={() => setIsRunning((prev) => !prev)}
          >
            시작하기
          </button>
        </div>
      )}
    </>
  );
};

export default PomodoroTimer;
