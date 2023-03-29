import { createMachine, assign } from "xstate";

interface Context {
  count: number;
}

type Event = { type: "INCREMENT" } | { type: "DECREMENT" };

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
      cond: (context) => context.count < 10,
      // cond: (context, event) => checkCondition(context, event),
    },
    DECREMENT: {
      actions: assign({
        count: (context) => context.count - 1,
      }),
      cond: (context) => context.count > 0,
      // cond: (context, event) => checkCondition(context, event),
    },
  },
  // on 속성을 활용하여 이벤트 설정
});
