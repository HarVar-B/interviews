import React, {Fragment, useState, useEffect} from 'react';


function Solution() {
  const [userInput, setUserInput] = useState({minutes: 0, seconds: 0});
  const [countdownSeconds, setCountDownSeconds] = useState(0)
  const [countdownState, setCountDownState] = useState(false);
  const [timerId, setTimerId] = useState(null)

  useEffect(() => {
    if (countdownState) {
      let id = setInterval(() => {
        setCountDownSeconds(prev => (prev - 1))
      }, 1000)
      setTimerId(id)
    } else {
      timerId && clearInterval(timerId)
    }
  }, [countdownState])

  const inputChangeHandler = key => e => {
    setUserInput(prev => ({...prev, [key]: Number(e.target.value)}));
  }
  const start = () => {
    setCountDownSeconds((userInput.minutes * 60) + (userInput.seconds))
    setCountDownState(true);
  }
  const toggleTimerState = () => {
    setCountDownState(prev => !prev)
  }
  const reset = () => {
    setUserInput({minutes: 0, seconds: 0});
    setCountDownSeconds(0);
    setCountDownState(false);
    setTimerId(null);
  }
  useEffect(() => {
    if (countdownSeconds < 1) {
      clearInterval(timerId);
      setCountDownState(false);
    }
  }, [countdownSeconds])
  return (
    <Fragment>
      <label>
        <input type="number" onChange={inputChangeHandler('minutes')} value={userInput.minutes}/>
        Minutes
      </label>
      <label>
        <input type="number" onChange={inputChangeHandler('seconds')} value={userInput.seconds}/>
        Seconds
      </label>
      <button onClick={start}>START</button>
      <button onClick={toggleTimerState}>PAUSE / RESUME</button>
      <button onClick={reset}>RESET</button>
      <h1
        data-testid="running-clock">{Math.floor(countdownSeconds / 60).toString().padStart(2, '0')}:{(countdownSeconds % 60).toString().padStart(2, '0')}</h1>
    </Fragment>
  );
}

export default Solution;
