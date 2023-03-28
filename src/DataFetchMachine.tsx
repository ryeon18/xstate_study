import { assign, createMachine } from "xstate";

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://api.edamam.com/api/food-database/v2/parser?app_id=68699a75&app_key=298f71cdd69358ae9f1a0c2f58a09e26&nutrition-type=cooking"
    );

    // if (!response.ok) {
    //   throw new Error(`Error: ${response.status}`);
    // }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export interface DataContext {
  data: Data | null;
  error: string | null;
  retries: number;
}

export interface Data {
  hints: [];
  text: string;
  _links: string;
  parsed: [];
}

export const fetchMachine = createMachine<DataContext>({
  id: "data",
  initial: "idle",
  context: {
    data: null,
    error: null,
    retries: 0,
    //  실패한 요청을 재시도하는 횟수를 추적하는 역할을 합니다. 이 값을 사용하여 요청이 여러 번 실패할 때 일정한 횟수만큼만 재시도하도록 구성할 수 있습니다.
  },
  predictableActionArguments: true,
  states: {
    idle: {
      on: {
        FETCH: "loading",
      },
    },
    loading: {
      invoke: {
        // invoke 속성을 사용하여 데이터를 가져오는 비동기 작업을 정의합니다.
        src: fetchData,
        onDone: {
          target: "success",
          actions: assign({ data: (_, event) => event.data }),
        },
        onError: {
          target: "error",
          actions: [
            assign({ error: (_, event) => event.data }),
            assign({ retries: (context) => context.retries + 1 }),
          ],
          cond: (context) => context.retries < 3, // 최대 재시도 횟수 설정
        },
      },
    },
    success: {
      // type: "final",
      // 타입을 추가하는 이유는 해당 상태가 최종 상태(final state)로 지정되어 머신이 더 이상 진행하지 않도록 하기 위함입니다.
      // 대부분의 경우 사용자가 다시 시도할 수 있도록 최종 상태 대신 일반 상태를 사용하는 것이 좋습니다.
      // 데이터 가져오기와 같은 작업을 다시 시도하려는 경우, 최종 상태를 사용하는 것은 권장되지 않습니다.
      // 대신 상태 전환을 다시 정의하여 사용자가 필요한 경우 다시 시도할 수 있도록 해야 합니다.
      on: {
        FETCH: "loading",
        // 사용자가 다시 데이터를 가져오려고 시도할 때 상태 전환을 처리할 수 있습니다
      },
    },
    error: {
      on: {
        FETCH: "loading",
      },
    },
  },
});
