import React, { useState } from "react";
// import styled from "styled-components";
import style from "../css/Timer/PomodoroTimer.module.scss";

const PomodoroTimer = () => {
  const time = 20;
  const total_time = 60 * 60;
  const start_time = time * 60; // 20분 -> 1200초
  const CIRCLE_CIRCUMFERENCE = 283; // 원 둘레

  const INITIAL_DASHARRAY = `${
    (start_time / total_time) * CIRCLE_CIRCUMFERENCE
  } ${CIRCLE_CIRCUMFERENCE}`;

  const [timerDasharray, setTimerDasharray] = useState(INITIAL_DASHARRAY);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(start_time);

  console.log(timerDasharray);

  const startTimer = () => {
    const interval = setInterval(() => {
      /* 
            전체 원이 283
            타이머가 start_time / 3600초 * 원의 둘레
            이게 하나씩 작아져야됨
            작아지는건 start_time이 되겠지...?
            start_time에서 0이 될때까지 반복을 해야돼
            만약 start_time이 0이 아니라면? 0이 될때까지 반복
            */
      if (start_time == 0) {
        return 0;
      } else {
        setTimeLeft((prev) => prev - 1);
        setTimerDasharray(
          `${
            ((timeLeft - 1) / total_time) * CIRCLE_CIRCUMFERENCE
          } ${CIRCLE_CIRCUMFERENCE}`
        );
      }
    }, 100);
  };

  return (
    <>
      <svg className={style.timerSvg} viewBox="0 0 100 100">
        <g className={style.timerCircle}>
          <path
            className={style.timerCircleBase}
            d="M 50, 50
        m -45, 0
        a 45,45 0 1,0 90,0
        a 45,45 0 1,0 -90,0"
          ></path>
          <circle
            className={style.timerPath}
            strokeDasharray={timerDasharray} // strokeDasharray 값으로 원의 진행 상태를 제어
            cx="50"
            cy="50"
            r="45"
          ></circle>
        </g>
      </svg>
      <button onClick={startTimer} disabled={isTimerRunning}>
        {isTimerRunning ? "타이머 진행 중" : "시작하기"}
      </button>
    </>
  );
};

export default PomodoroTimer;
