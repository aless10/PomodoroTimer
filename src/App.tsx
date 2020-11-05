import React from "react";
import "./App.css";
import { SetTimer } from "./components/SetTimer";
import { Button } from "./components/Button";

const Stages = Array("session", "break");

function App() {
  const [sessionTime, setSessionTime] = React.useState(25);
  const [breakTime, setBreakTime] = React.useState(5);

  const [activeTimer, setActiveTimer] = React.useState(Stages[0].toUpperCase());

  const stringifyTime = (value: number) => {
    if (value < 10) return "0" + value;
    return value;
  };

  const onIncrementSession = () => {
    setSessionTime((prevState) => prevState + 1);
  };

  const onIncrementBreak = () => {
    setBreakTime((prevState) => prevState + 1);
  };

  const onDecrementSession = () => {
    setSessionTime((prevState) => (prevState === 0 ? 0 : prevState - 1));
  };

  const onDecrementBreak = () => {
    setBreakTime((prevState) => (prevState === 0 ? 0 : prevState - 1));
  };

  return (
    <div className="App">
      <SetTimer
        onIncrement={onIncrementSession}
        value={sessionTime}
        name={Stages[0]}
        onDecrement={onDecrementSession}
      />
      <SetTimer
        onIncrement={onIncrementBreak}
        value={breakTime}
        name={Stages[1]}
        onDecrement={onDecrementBreak}
      />
      <div>
        <h2>{activeTimer}</h2>
        <p>{stringifyTime(sessionTime)}</p>
      </div>
      <div>
        <Button name="start" onClick={() => {}} icon="play" />
        <Button name="pause" onClick={() => {}} icon="pause" />
        <Button name="reset" onClick={() => {}} icon="undo" />
      </div>
    </div>
  );
}

export default App;
