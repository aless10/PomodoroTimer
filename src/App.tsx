import React from "react";
import "./App.css";
import { SetTimer } from "./components/SetTimer";
import { Button } from "./components/Button";

const Stages = ["session", "break"];

const DEFAULT_SESSION_LENGTH = 1;
const DEFAULT_BREAK_LENGTH = 1;

function App() {
  const [sessionLength, setSessionLength] = React.useState(
    DEFAULT_SESSION_LENGTH
  );
  const [breakLength, setBreakLength] = React.useState(DEFAULT_BREAK_LENGTH);
  const [currentTime, setCurrentTime] = React.useState(sessionLength * 60);

  const [timerInterval, setTimerInterval] = React.useState<number | null>(null);
  const [isActive, setIsActive] = React.useState(false);

  const [activeTimer, setActiveTimer] = React.useState(Stages[0]);

  const stringifyTime = (value: number) => {
    if (value < 10) return "0" + value;
    return value.toString();
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const minutesStr = stringifyTime(minutes);

    const seconds = timeInSeconds - 60 * minutes;
    const secondsStr = stringifyTime(seconds);

    return `${minutesStr}:${secondsStr}`;
  };

  const onIncrementSession = () => {
    setSessionLength((prevState) => prevState + 1);
    incrementCurrentTime();
  };

  const onIncrementBreak = () => {
    setBreakLength((prevState) => prevState + 1);
    incrementCurrentTime();
  };

  const onDecrementSession = () => {
    setSessionLength((prevState) => (prevState === 1 ? 1 : prevState - 1));
    decrementCurrentTime();
  };

  const onDecrementBreak = () => {
    setBreakLength((prevState) => (prevState === 1 ? 1 : prevState - 1));
    decrementCurrentTime();
  };

  const incrementCurrentTime = () => {
    if (currentTime === 1) return;
    if (activeTimer === Stages[0]) {
      setCurrentTime((sessionLength + 1) * 60);
    } else {
      setCurrentTime((breakLength + 1) * 60);
    }
  };

  const decrementCurrentTime = () => {
    if (activeTimer === Stages[0]) {
      setCurrentTime((sessionLength - 1) * 60);
    } else {
      setCurrentTime((breakLength - 1) * 60);
    }
  };

  const onStart = () => {
    if (isActive) return;
    setIsActive(true);
    const intervalID = setInterval(() => {
      setCurrentTime((prevState: number) => {
        const newTime = prevState - 1;
        if (newTime > 0) return newTime;
        console.log(activeTimer);
        if (activeTimer === Stages[0]) {
          setActiveTimer(Stages[1]);
          return breakLength * 60;
        } else {
          setActiveTimer(Stages[0]);
          return sessionLength * 60;
        }
      });
    }, 100);
    //@ts-ignore
    setTimerInterval(intervalID);
    console.log("Start");
  };

  const onPause = () => {
    setIsActive(false);
    //@ts-ignore
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const onReset = () => {
    setIsActive(false);
    if (activeTimer === Stages[0]) {
      setCurrentTime(sessionLength * 60);
    } else {
      setCurrentTime(breakLength * 60);
    }
    //@ts-ignore
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  return (
    <div className="App">
      <SetTimer
        onIncrement={onIncrementSession}
        value={sessionLength}
        name={Stages[0]}
        onDecrement={onDecrementSession}
      />
      <SetTimer
        onIncrement={onIncrementBreak}
        value={breakLength}
        name={Stages[1]}
        onDecrement={onDecrementBreak}
      />
      <div>
        <h2>{activeTimer.toUpperCase()}</h2>
        <p>{formatTime(currentTime)}</p>
      </div>
      <div>
        <Button name="start" onClick={onStart} icon="play" />
        <Button name="pause" onClick={onPause} icon="pause" />
        <Button name="reset" onClick={onReset} icon="undo" />
      </div>
    </div>
  );
}

export default App;
