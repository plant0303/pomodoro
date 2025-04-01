import React, { useState, useEffect } from "react";
import style from "../css/Timer/PomodoroTimer.module.scss";
const PomodoroTimer = () => {
  // 타이머 초기 설정
  const initialMinutes = 40;
  // 남은 시간 저장
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  // 타이머 실행 여부 상태
  const [isRunning, setIsRunning] = useState(false);
  // 드래그 상태 여부
  const [isDragging, setIsDragging] = useState(false);

  // 반지름
  const radius = 50;
  // 원의 둘레
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


  const handleMouseDown = () => {
    setIsDragging(true);
  }
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

    //타이머 리셋
    const handleReset = () => {
      setIsRunning(false);
      setTimeLeft(initialMinutes * 60);
    }

  return (
    <>
      <div className={style.timerCont}>
        <svg className={`${!isRunning && style.svgStart}`} onMouseDown={handleMouseDown} viewBox="0 0 120 120">
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

        {isRunning ?
        <div className={style.btnCont}>
          <button className={`${style.timerBtn} ${isRunning ? style.pause : style.start}`}
                  onClick={() => setIsRunning((prev) => !prev)}>일시정지</button>
          <button className={`${style.timerBtn} ${isRunning ? style.pause : style.start}`}
                  onClick={handleReset}>초기화</button>                 
        </div>
        : 
        <div className={style.btnCont}>
          <button className={`${style.timerBtn} ${isRunning ? style.pause : style.start}`}
                  onClick={() => setIsRunning((prev) => !prev)}>시작하기</button>
        </div>
        }
    </>
  );
};

export default PomodoroTimer;
