import React, { useState, useEffect } from "react";
import style from "../css/Timer/PomodoroTimer.module.scss";

const PomodoroTimer = () => {
  const initialMinutes = 40;
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [angle, setAngle] = useState(0);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - (timeLeft / 60) / 60);

  // 각도 계산 함수
  const calculateAngleAndTime = (e) => {
    const centerX = 60;
    const centerY = 60;
    const rect = e.target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const svgX = (mouseX / rect.width) * 120;
    const svgY = (mouseY / rect.height) * 120;
    
    const dx = svgX - centerX;
    const dy = svgY - centerY;
    
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360; // 12시 방향을 0도로
    
    const minutes = Math.round(angle / 6);
    const normalizedMinutes = minutes === 60 ? 0 : minutes;
    
    return { angle, minutes: normalizedMinutes };
  };

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const { minutes } = calculateAngleAndTime(e);
    setTimeLeft(minutes * 60);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const { minutes } = calculateAngleAndTime(e);
    setTimeLeft(minutes * 60);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 눈금 생성
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

  return (
    <div className={style.timerCont}>
      <svg
        className={`${!isRunning && style.svgStart}`}
        viewBox="0 0 120 120"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          <linearGradient id="grad" x1="0%" y1="100%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#ffd455" />
            <stop offset="100%" stopColor="#ff4500" />
          </linearGradient>
        </defs>
        <circle className={style.timerBackground} cx="60" cy="60" r={radius} />
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
  );
};

export default PomodoroTimer;