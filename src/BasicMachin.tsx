import { createMachine, assign } from "xstate";

interface Context {
  count: number;
}

type Event = { type: "INCREMENT" } | { type: "DECREMENT" };

export const checkCondition = (context: Context, event: Event): boolean => {
  console.log(context, event);
  if (event.type === "INCREMENT") {
    if (context.count > 10) {
      alert("10보다 클 수 없습니다.");
      return false;
    } else {
      return true;
    }
  } else {
    if (context.count < 0) {
      alert("0보다 작을 수 없습니다.");
      return false;
    } else {
      return true;
    }
  }
};
export const CounterMachine = createMachine<Context, Event>({
  schema: {
    context: {} as Context,
    events: {} as Event,
  },
  // 타입스크립트를 사용할 경우 schema 속성을 활용하여 타입을 지정할 수 있습니다.
  // Typegen을 사용하여 자동으로 타입을 생성할 수 있습니다만 현재 베타버전으로 제한사항이 많이 있으니 참고 바랍니다.

  context: {
    count: 0,
  },
  // context 속성을 활용하여 state의 초기값 설정
  id: "counter",
  predictableActionArguments: true,
  on: {
    INCREMENT: {
      actions: assign({
        count: (context) => context.count + 1,
      }),
      // cond: (context) => context.count < 10,
      cond: (context, event) => checkCondition(context, event),
    },
    DECREMENT: {
      actions: assign({
        count: (context) => context.count - 1,
      }),
      // cond: (context) => context.count > 0,
      cond: (context, event) => checkCondition(context, event),
    },
  },
  // on 속성을 활용하여 이벤트 설정
});
