import React from "react";
import { useCounterState } from "./CounterContext";

const CounterDisplay: React.FC = () => {
  const { counter } = useCounterState();

  return (
    <div style={{ justifyContent: "center" }}>
      <h3>{counter}</h3>
    </div>
  );
};

export default CounterDisplay;