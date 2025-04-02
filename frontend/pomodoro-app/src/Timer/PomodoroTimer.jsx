import React, { useState, useEffect, useCallback } from "react";
import style from "../css/Timer/PomodoroTimer.module.scss";

const PomodoroTimer = () => {
  
  const [state, setState] = useState('waitingWork');

  // 공부시간
  const [isRunning, setIsRunning] = useState(false); // 실행여부 관리
  const [initialMinutes, setInitialMinutes] = useState(25); //기본 시간
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // 시간 변경사항 업데이트

  //휴식시간
  const [isBreakTime, setIsBreakTiime] = useState(false); // 휴식시간 변경사항 관리
  const [breakTime, setBreakTime] = useState(5);
  const [breakTimeLeft, setBreakTimeLeft] = useState(breakTime * 60);

  // 타이머 상태
  const [angle, setAngle] = useState(null); // 각도 변경
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태 관리
  const radius = 50; // 반지름
  const circumference = 2 * Math.PI * radius; // 원의 둘레

  // 눈금
  const tickMarks = Array.from({ length: 60 }, (_, i) => {
    const angle = (i / 60) * 360;
    return i % 15 === 0 ? (
      <line
        key={i}
        x1="60"
        y1="20"
        x2="60"
        y2="17"
        stroke="#ccc"
        strokeWidth="0.7"
        transform={`rotate(${angle} 60 60)`}
      />
    ) : (
      <line
        key={i}
        x1="60"
        y1="19"
        x2="60"
        y2="17"
        stroke="#ccc"
        strokeWidth="0.2"
        transform={`rotate(${angle} 60 60)`}
      />
    );
  });

  /*
  waitingWork: 공부 시작 전
  startWork: 공부 중
  waitingBreak: 공부 완료, 휴식 전
  startBreak: 휴식중
  */
  const renderControlButtons  = useCallback(() => {
    if(state === 'waitingWork') {
      return(
        <>
          <button
            className={`${style.timerBtn} ${style.start}`}
            onClick={() => setState('startWork')}
          >
            시작하기
          </button>
        </>
      );
    } else if(state === 'startWork'){
      return(
        <>
          <button className={`${style.timerBtn} ${isRunning ? style.pause : style.start}`} 
          onClick={() => setIsRunning((prev) => !prev)}>
            일시정지
          </button>
          <button
            className={`${style.timerBtn} ${isRunning ? style.pause : style.start}`} onClick={handleReset}>
            초기화
          </button>
        </>
      );
    } else if(state === 'waitingBreak'){
      return(
        <>
          <button className={`${style.timerBtn} ${style.start}`} onClick={handleBreakStart}>휴식 시작</button>
          <button className={`${style.timerBtn} ${style.skip}`} onClick={handleSkipBreak}>휴식 스킵</button>
        </>
      );
    } else if(state === 'startBreak'){
      return(
        <>
          <button className={`${style.timerBtn} ${style.skip}`} onClick={handleSkipBreak}>휴식 스킵</button>
        </>
      );  
    }
  })
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsBreakTiime(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const strokeDashoffset =
    circumference - (Math.floor(timeLeft) / 3600) * circumference;

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
    if (isRunning) return;
    setIsDragging(true);
    const { minutes } = calculateAngleAndTime(e);
    setTimeLeft(minutes * 60);
    setInitialMinutes(minutes);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const { minutes } = calculateAngleAndTime(e);
    setTimeLeft(minutes * 60);
    setInitialMinutes(minutes);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 공부 시간 입력 핸들러
  const handleInputValue = (e) => {
    if (isRunning) return;
    let value = e.target.value;

    const numValue = value === "" ? 0 : Math.min(parseInt(value, 10), 60);
    setInitialMinutes(numValue);
    setTimeLeft(numValue * 60);
  };

  // 휴식시간 입력
  const handleInputBreak = (e) => {
    if (isRunning) return;
    const value = Math.min(parseInt(e.target.value) || 0, 60);
    setBreakTime(value);
    setBreakTimeLeft(value * 60);
  };

  // 휴식시간 시작
  const handleBreakStart = () => {
    setIsRunning(true);
  }

  // 휴식 스킵
  const handleSkipBreak = () => {

  }
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
          {/* 공부시간 */}
          <div>
            <p>pomodoro</p>
            <input
              className={style.timeValue}
              type="text"
              min="1"
              max="60"
              value={Math.floor(timeLeft / 60)}
              onChange={handleInputValue}
            ></input>
            :
            <input
              className={style.timeValue}
              type="text"
              value={(timeLeft % 60).toString().padStart(2, "0")}
            ></input>
          </div>
          {/* 휴식시간 */}
          <div>
            <p>Break</p>
            <input
              className={style.timeValue}
              type="text"
              min="0"
              max="60"
              value={Math.floor(breakTimeLeft / 60)}
              onChange={handleInputBreak}
            ></input>
            :
            <input
              className={style.timeValue}
              type="text"
              value={(breakTimeLeft % 60).toString().padStart(2, "0")}
              readOnly
            ></input>
          </div>
        </div>
      </div>

      <div className={style.btnCont}>
        {renderControlButtons()}
      </div>
    </>
  );
};

export default PomodoroTimer;
