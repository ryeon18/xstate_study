import React, { useMemo } from "react";
import "./App.css";
import { useMachine } from "@xstate/react";
import { TrafficLightMachine } from "./TrafficLightMachine";
import { Link } from "react-router-dom";

export const Traffic = () => {
  const Machine = useMemo(() => TrafficLightMachine, []);
  // 머신 객체가 렌더링 사이에 변경되지 않도록 useMemo를 사용합니다.
  // useMemo를 사용함으로써 Machine 객체를 캐싱하고, 이를 useMachine에 전달합니다.
  // useMemo의 첫번째 인자로 Machine을 반환하는 콜백함수를 전달하였고, 두번째 인자로는 빈 배열을 전달하여 trafficLightMachine 객체가 변경될 때마다 다시 계산되지 않도록 하였습니다.
  // 머신 객체가 변경되면, useMachine은 새로운 머신 인스턴스를 생성합니다.
  // 이는 머신의 상태를 초기화하고, 모든 이벤트를 취소합니다.
  // 머신 객체가 변경되지 않는 한, useMachine은 항상 동일한 머신 인스턴스를 반환합니다.
  // Xstate의 머신은 객체이며, 불변성을 유지해야 합니다.
  // 생성 후에는 머신 객체가 수정되서는 안된다.
  const [current, send] = useMachine(Machine);

  console.log("current", current);
  return (
    <div className="wrap">
      <div className="traffic-light">
        <input
          type="radio"
          readOnly
          className="light red"
          checked={current.matches({ ON: "red" })}
        />
        <input
          type="radio"
          readOnly
          className="light yellow"
          checked={current.matches({ ON: "yellow" })}
        />
        <input
          type="radio"
          readOnly
          className="light green"
          checked={current.matches({ ON: "green" })}
        />
        <button onClick={() => send("NEXT")}>Next</button>
        <button onClick={() => send("TURN_ON")}>TURN_ON</button>
        <button onClick={() => send("TURN_OFF")}>TURN_OFF</button>
      </div>
      <Link to="/" className="back">
        Go back
      </Link>
    </div>
  );
};
