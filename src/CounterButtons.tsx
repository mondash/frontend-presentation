import React, { useState } from "react";
import { useCounter } from "./CounterContext";

const CounterButtons: React.FC = () => {
  const [{ counter }, counterDispatch] = useCounter();
  const [value, setValue] = useState(0);

  const increment = () => counterDispatch({ type: "INCREMENT" });
  const incrementAsync = () => counterDispatch({ type: "INCREMENT_ASYNC" });
  const set = () => counterDispatch({ type: "SET", value })
  const reset = () => counterDispatch({ type: "RESET" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(Number(event.target.value));

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      gap: "1em",
      justifyContent: "center",
    }}>
      <button onClick={increment}>Increment</button>
      <button onClick={incrementAsync}>Increment Async</button>
      <span>
        <input type="number" onChange={handleChange} value={value} />
        <button onClick={set}>Set</button>
      </span>
      {counter >= 10 && (
        <button onClick={reset}>Reset</button>
      )}
    </div>
  );
};

export default CounterButtons;