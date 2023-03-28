import React, { useMemo } from "react";
import "./App.css";
import { useMachine } from "@xstate/react";
import { CounterMachine } from "./BasicMachin";
import { Link } from "react-router-dom";

export const Basic = () => {
  const Machine = useMemo(() => CounterMachine, []);

  const [states, send] = useMachine(Machine);

  return (
    <div className="wrap">
      <div className="count">
        <h2 className="countTitle">Count: {states.context.count}</h2>
        <button onClick={() => send("INCREMENT")} className="countBtn">
          Increment
        </button>
        <button onClick={() => send("DECREMENT")} className="countBtn">
          Decrement
        </button>
      </div>
      <Link to="/" className="back">
        Go back
      </Link>
    </div>
  );
};
