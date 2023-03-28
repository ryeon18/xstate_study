import { createMachine, MachineOptions } from "xstate";

type TrafficLightEvents =
  | { type: "NEXT" }
  | { type: "TURN_ON" }
  | { type: "TURN_OFF" };

export type TrafficLightStates =
  | { value: { ON: "red" }; context: undefined }
  | { value: { ON: "yellow" }; context: undefined }
  | { value: { ON: "green" }; context: undefined }
  | { value: "OFF"; context: undefined };

export const TrafficLightMachine = createMachine<
  undefined,
  TrafficLightEvents,
  TrafficLightStates
>({
  initial: "OFF",
  id: "traffic-light",
  predictableActionArguments: true,
  // 이 옵션은 액션에 필요한 인자들이 항상 정해진 순서로 전달되도록 보장합니다. 기본적으로는 false로 되어 있습니다.
  // 이 옵션을 true로 설정하면, 액션에 전달되는 인자들은 항상 동일한 순서로 전달되며 필요한 인자들이 전달되지 않아서 생기는 버그를 예방할 수 있습니다.
  // 액션에 전달되는 인자들이 항상 일정하게 전달되므로 디버깅이 쉬워지는 장점이 있습니다.

  states: {
    ON: {
      initial: "red",
      on: {
        TURN_OFF: "OFF",
      },
      states: {
        green: {
          on: {
            NEXT: "yellow",
          },
          after: {
            3500: "yellow",
          },
        },
        yellow: {
          on: {
            NEXT: "red",
          },
          after: {
            1500: "red",
          },
        },
        red: {
          on: { NEXT: "green" },
          after: {
            5000: "green",
          },
        },
      },
    },
    OFF: {
      on: {
        TURN_ON: "ON",
      },
    },
  },
});
