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

  // 눈금
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
  
  // 각도 계산 함수
  const calculateAngleAndTime = (e) => {
    const rect = e.target.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 120;
    const svgY = ((e.clientY - rect.top) / rect.height) * 120;
    
    let angle = Math.atan2(svgY - 60, svgX - 60) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360; // 12시=0°

    // 355°~360° → 60분, 나머지는 6°=1분 계산
    const minutes = angle >= 355 ? 60 : Math.round(angle / 6);
    return { angle, minutes };
  };


  // 마우스 이벤트 핸들러
  const handleMouseDown = (e) => {
    if(isRunning) return;
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

  return (
    <>
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
