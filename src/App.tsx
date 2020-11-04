import React from 'react';
import './App.css';

function App() {

  const [sessionTime, setSessionTime] = React.useState(25)
  const [breakTime, setBreakTime] = React.useState(5)

  const onIncrementSession = () => {
    setSessionTime((prevState => prevState + 1))
  }

  const onIncrementBreak = () => {
    setBreakTime((prevState => prevState + 1))
  }

  const onDecrementSession = () => {
    setSessionTime((prevState => prevState === 0 ? 0 : prevState - 1))
  }

  const onDecrementBreak = () => {
    setBreakTime((prevState => prevState === 0 ? 0 : prevState - 1))
  }

  return (
    <div className="App">
      <div id="session">
        <button onClick={onIncrementSession}>+</button>
        <span>{sessionTime}</span>
        <button onClick={onDecrementSession}>-</button>
      </div>
      <div id="break">
        <button onClick={onIncrementBreak}>+</button>
        <span >{breakTime}</span>
        <button onClick={onDecrementBreak}>-</button>
      </div>
    </div>
  );
}

export default App;
