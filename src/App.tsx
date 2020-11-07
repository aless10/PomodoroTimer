import React from "react";
import "./App.css";
import { SetTimer } from "./components/SetTimer";
import { Button } from "./components/Button";

const Stages = Array("session", "break");

const DEFAULT_SESSION_LENGTH = 25;
const DEFAULT_BREAK_LENGTH = 5;

function App() {
  const [sessionLength, setSessionLength] = React.useState(
    DEFAULT_SESSION_LENGTH
  );
  const [breakLength, setBreakLength] = React.useState(DEFAULT_BREAK_LENGTH);
  const [currentTime, setCurrentTime] = React.useState(sessionLength * 60);
  const [time, setTime] = React.useState(
    DEFAULT_SESSION_LENGTH.toString() + ":00"
  );
  const [timerId, setTimerId] = React.useState(null);
  const [isActive, setIsActive] = React.useState(false);

  const [activeTimer, setActiveTimer] = React.useState(Stages[0]);

  const stringifyTime = (value: number) => {
    if (value < 10) return "0" + value;
    return value.toString();
  };

  const onIncrementSession = () => {
    setSessionLength((prevState) => prevState + 1);
  };

  const onIncrementBreak = () => {
    setBreakLength((prevState) => prevState + 1);
  };

  const onDecrementSession = () => {
    setSessionLength((prevState) => (prevState === 0 ? 0 : prevState - 1));
  };

  const onDecrementBreak = () => {
    setBreakLength((prevState) => (prevState === 0 ? 0 : prevState - 1));
  };

  const onStart = () => {
    console.log("Start");
  };

  const onPause = () => {
    setIsActive(false);
  };

  const onReset = () => {
    setIsActive(false);
    if (activeTimer == Stages[0]) {
      setCurrentTime(sessionLength * 60);
    } else {
      setCurrentTime(breakLength * 60);
    }
    setTimerId(null);
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
        <p>{time}</p>
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
