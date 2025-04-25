import React, { useState, useEffect, useMemo } from "react";
import style from "../css/Timer/PomodoroTimer.module.scss";

const PomodoroTimer = () => {
  // 타이머 순서와 설정
  const [timers, setTimers] = useState([
    { type: "work", duration: 25 * 60, remaining: 25 * 60 }, // 공부 시간 (25분)
    { type: "break", duration: 5 * 60, remaining: 5 * 60 }, // 휴식 시간 (5분)
  ]);
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 현재 활성화된 타이머
  const currentTimer = timers[currentTimerIndex];

  // 타이머 시각화 관련
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const [isDragging, setIsDragging] = useState(false);

  // 스트로크 오프셋 계산
  const strokeDashoffset =
    circumference - (currentTimer.remaining / 3600) * circumference;

  // 타이머 실행 효과
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = [...prevTimers];

        // 현재 타이머 시간 감소
        if (newTimers[currentTimerIndex].remaining > 0) {
          newTimers[currentTimerIndex].remaining -= 1;
        }
        // 현재 타이머 종료 시 다음 타이머로 이동
        else {
          clearInterval(interval);
          setIsRunning(false);
          const nextIndex = (currentTimerIndex + 1) % prevTimers.length;
          setCurrentTimerIndex(nextIndex);

          // 다음 타이머 시간 리셋
          newTimers[nextIndex].remaining = newTimers[nextIndex].duration;
        }

        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, currentTimerIndex]);

  // 타이머 시작/일시정지
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // 타이머 리셋
  const resetTimer = () => {
    setIsRunning(false);
    setTimers((prevTimers) =>
      prevTimers.map((timer) => ({
        ...timer,
        remaining: timer.duration,
      }))
    );
    setCurrentTimerIndex(0);
  };

  // 타이머 스킵
  const skipTimer = () => {
    setIsRunning(false);
    const nextIndex = (currentTimerIndex + 1) % timers.length;
    setCurrentTimerIndex(nextIndex);
    setTimers((prevTimers) => {
      const newTimers = [...prevTimers];
      newTimers[nextIndex].remaining = newTimers[nextIndex].duration;
      return newTimers;
    });
  };

  // 시간 설정 변경
  const updateTimerSettings = (index, newDuration) => {
    if (isRunning) return;

    setTimers((prevTimers) => {
      const newTimers = [...prevTimers];
      newTimers[index] = {
        ...newTimers[index],
        duration: newDuration * 60,
        remaining: newDuration * 60,
      };
      return newTimers;
    });
  };

  // 각도 계산 함수
  const calculateAngleAndTime = (e) => {
    const rect = e.target.getBoundingClientRect();
    console.log("rect", rect);
    const svgX = ((e.clientX - rect.left) / rect.width) * 120;
    const svgY = ((e.clientY - rect.top) / rect.height) * 120;
    console.log("svgX, svgY", svgX, svgY);
    let angle = Math.atan2(svgY - 60, svgX - 60) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360; // 12시=0°
    console.log("angle", angle);
    // 355°~360° → 60분, 나머지는 6°=1분 계산
    const minutes = angle >= 355 ? 60 : Math.round(angle / 6);
    return { angle, minutes };
  };

  // 마우스 이벤트 핸들러 (원형 타이머 조정)
  const handleMouseDown = (e) => {
    if (isRunning) return;
    setIsDragging(true);
    const { minutes } = calculateAngleAndTime(e);
    const newDuration = minutes * 60;

    setTimers((prevTimers) => {
      const newTimers = [...prevTimers];
      newTimers[currentTimerIndex] = {
        ...newTimers[currentTimerIndex],
        duration: newDuration,
        remaining: newDuration, // 남은 시간도 새 duration으로 초기화
      };
      return newTimers;
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isRunning) return;
    // 각도 계산 및 시간 설정 로직 구현
    const { minutes } = calculateAngleAndTime(e);
    const newDuration = minutes * 60;

    setTimers((prevTimers) => {
      const newTimers = [...prevTimers];
      newTimers[currentTimerIndex] = {
        ...newTimers[currentTimerIndex],
        duration: newDuration,
        remaining: newDuration, // 남은 시간도 새 duration으로 초기화
      };
      return newTimers;
    });
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
          <div className={style.timeDisplay}>
            <div>
              {Math.floor(currentTimer.remaining / 60)
                .toString()
                .padStart(2, "0")}
              :{(currentTimer.remaining % 60).toString().padStart(2, "0")}
            </div>
            <div className={style.timerType}>
              {currentTimer.type === "work" ? "공부 시간" : "휴식 시간"}
            </div>
          </div>

          <div className={style.settings}>
            <div className={style.timeValue}>
              <label>work</label>
              <div>
                <input
                  type="text"
                  min="1"
                  max="60"
                  value={timers[0].duration / 60}
                  onChange={(e) =>
                    updateTimerSettings(0, parseInt(e.target.value) || 0)
                  }
                  disabled={isRunning}
                />
                <span>min</span>
              </div>
            </div>
            <div className={style.timeValue}>
              <label>break</label>
              <div>
                <input
                  type="text"
                  min="1"
                  max="60"
                  value={timers[1].duration / 60}
                  onChange={(e) =>
                    updateTimerSettings(1, parseInt(e.target.value) || 0)
                  }
                  disabled={isRunning}
                />
                <span>min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.btnCont}>
        {!isRunning && currentTimer.remaining === currentTimer.duration ? (
          <button className={style.startButton} onClick={toggleTimer}>
            시작하기
          </button>
        ) : (
          <>
            <button
              className={`${style.controlButton} ${
                isRunning ? style.pause : style.resume
              }`}
              onClick={toggleTimer}
            >
              {isRunning ? "일시정지" : "계속하기"}
            </button>
            <button
              className={`${style.controlButton} ${style.reset}`}
              onClick={resetTimer}
            >
              초기화
            </button>
            {currentTimer.type != "work" && (
              <button
                className={`${style.controlButton} ${style.skip}`}
                onClick={skipTimer}
              >
                공부 시작하기
              </button>
            )}
          </>
        )}
      </div>
      </>
  );
};

export default PomodoroTimer;
