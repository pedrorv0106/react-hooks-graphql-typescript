import { useState } from 'react';

const useCounter = (initialState = 10) => {
  const [counter, setCounter] = useState(initialState);

  const increment = () =>
    String(counter).length < 5 ? setCounter(counter + 1) : counter;

  const decrement = () => setCounter(counter - 1);

  const reset = () => setCounter(initialState);

  const custom = (count: number) => setCounter(count);

  return {
    counter,
    increment,
    decrement,
    reset,
    custom,
  };
};

export default useCounter;
