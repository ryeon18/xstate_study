---
theme: default
class: "text-center"
highlighter: shiki
lineNumbers: true
info: |
  ## Xstate
drawings:
  persist: false
# use UnoCSS
# css: unocss
---

<br>
<br>
<br>
<br>

# Xstate

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

## About

<div class="page2">

<br>
<br>

<ol>
  <li>Xstate 개념</li>
  <li>Xstate 구성</li>
  <li>Xstate 기능</li>
  <li>Xstate 예제</li>
  <li>Xstate 강점</li>
</ol>

<br>
<br>
</div>

<style>
h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

## Xstate 개념

<br>
<br>
<p>Recoil, Jotai, Redux와 같은 상태관리 라이브러리이자 FSM 및 상태 차트를 만드록 해석할 수 있게 해주는 라이브러리입니다.</p>
<br>
<p>데이터와 상태를 명확히 구분하고, 상태의 흐름과 상태의 전이조건, 사이드이팩트의 실행 구조등이 한 눈에 보이도록 코드를 작성 할 수 있습니다.</p>
<br>
<p>FSM (유한상태기계)
초기 상태와 한정된 수의 이벤트가 있고, 상태와 이벤트가 주어지면 전환 함수가 다음 상태를 결정합니다.</p>

<br>
<br>

<style>
h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

## Xstate 구성

<br>
<br>
<h3> 1. State & Machines </h3>
<br>

<p>기본적으로 상태머신은 createMachine 함수를 사용하여 만듭니다.
createMachine에서 상태와 이벤트를 정의합니다.</p>

<style>
  h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  }
</style>

---

```ts
import { createMachine, assign } from "xstate";

interface Context {
  count: number;
}

type Event = { type: "INCREMENT" };

export const counterMachine = createMachine<Context, Event>({
  schema: {
    context: {} as Context,
    event: {} as Event,
  },
  id: "counter",
  initial: "idle",
  predictableActionArguments: true,
  context: {
    count: 0,
  },
  states: {
    idle: {
      on: {
        INCREMENT: {
          actions: assign({
            count: (context) => context.count + 1,
          }),
        },
      },
    },
  },
});
```

기본 예제로 상태머신에는 schema, id, initial, context, states, predictableActionArguments를 가지고 있습니다.

1. schema : 상태머신의 context, event의 타입 지정
2. id: 상태머신의 고유 이름
3. Initial: 상태머신의 초기 상태 값.
   초기 설정을 하지 않으면 오류가 납니다.
4. context: 상태머신이 가지고 있는 state의 초기값 설정
5. predictableActionArguments: 액션에 필요한 인자들이 항상 정해진 순서로 전달되도록 설정
   이 옵션은 액션에 필요한 인자들이 항상 정해진 순서로 전달되도록 보장합니다. 기본적으로는 false로 되어 있습니다.
   이 옵션을 true로 설정하면, 액션에 전달되는 인자들은 항상 동일한 순서로 전달되며 필요한 인자들이 전달되지 않아서 생기는 버그를 예방할 수 있습니다.
   액션에 전달되는 인자들이 항상 일정하게 전달되므로 디버깅이 쉬워지는 장점이 있습니다.
6. States : 상태머신이 가지는 상태와 각 상태에 따른 상태전이(이벤트)를 설정 on 속성에서 설정
   초기값인 idle의 상태인 경우 on 속성에 INCREMENT라고 이벤트가 설정되었습니다.

<style>
h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

## Xstate 기능

<br>
<br>

### 1. Actions

<br>

<p> 상태 전환에 따른 로직 캡슐화 및 상태 머신 내부의 데이터를 변경하는 역할을 합니다.</p>
<p> Machine의 옵션인 actions 속성에 함수화하여 사용할 수 있습니다.</p>

```ts
export const counterMachine = createMachine<Context, Event>({
  states: {
    idle: {
      on: {
        INCREMENT: {
          actions: "increment",
        },
      },
    },
  },{
    actions : {
      increment: (context,event) => context.count + 1
    }
  }
});
```

<style>
h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

## Xstate 기능

<br>
<br>

### 1. Actions

<br>

<p> Actions 기능은 여러 속성들이 있는 아래와 같은 속성들이 있습니다.</p>
<br>

- assign()

```ts
actions: assign({
  count: (context, event) => context.count + 1,
});
```

<br>

- log()

```ts
actions: [
  assign({
    count: (context, event) => context.count + 1,
  }),
  log((context) => `count is ${context.count}`),
];
```

<br>
<br>
<br>

1. assign()
   : 상태 머신의 컨텍스트를 업데이트 하는 액션. assign을 통해 상태 머신 내부의 데이터를 변경합니다.
2. log()
   : 상태 전환 중에 콘솔에 로그를 출력하는 데 사용됩니다. 따라서 디버깅 목적으로 사용하기 좋습니다.

<style>
h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

- send()

```ts
const counterMachine = createMachine(
  {
    id: "counter",
    context: {
      count: 10,
    },
    initial: "active",
    states: {
      active: {
        on: {
          DECREMENT: {
            actions: [
              (context) => {
                context.count -= 1;
              },
              send("CHECK_COUNT"),
            ],
          },
          CHECK_COUNT: {
            cond: "isCountZero",
            target: "active",
            actions: (context) => {
              context.count = 0;
            },
          },
        },
      },
    },
  },
  {
    guards: {
      isCountZero: (context, event) => context.count === 0,
    },
  }
);
```

3. send()
   : 상태 머신에 이벤트를 보내거나 다른 상태 머신에 이벤트를 보내는 액션.

<style>
h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

### 2. Guarded transitions

```ts
states: {
      active: {
        on: {
          DECREMENT: {
            actions: [
              (context) => {
                context.count -= 1;
              },
              send("CHECK_COUNT"),
            ],
          },
         CHECK_COUNT: {
            cond: 'isCountZero',
            target: 'active',
            actions: (context) => {
              context.count = 0;
            },
          },
        },
      },
    },
  {
    guards: {
      isCountZero: (context, event) => context.count === 0,
    },
  }
```

<br>

<p> Xstate의 가드(guard) 기능은 상태 전환할 때 조건 검사할 때 사용되는 기능이며, 상태 전환(transition)이 발생하기 전에 주어진 조건이 충족되었는지 확인하는 역할을 합니다.</p>

<p>
가드 함수는 context와 event를 인자로 받으며, 조건에 따라 Boolean값을 반환합니다.
조건이 참인 경우에만 상태전환이 발생합니다.

cond 속성에 사용한 함수는 machine의 옵션인 guards 속성에 함수화 하여 사용할 수 있습니다.</p>

<style>
h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
/* h3 { text-transform: lowercase; } */
/* h3:first-letter { text-transform: uppercase; } */
</style>

---

## Invoking Services

<br>

<p>상태 머신에서 API 호출 등 비동기 작업을 하는 기능입니다.</p>
<p>invoke 속성을 사용하여 데이터를 가져옵니다.</p>
<p>invoke를 사용하면 외부 작업의 실행이 상태 머신과 동기화되어 상태 전환에 따라 작업을 시작하고 취소할 수 있습니다.</p>
<p>외부 작업이 완료되면 상태 머신은 이를 알리고 결과를 처리하거나 오류를 처리할 수 있습니다. 이렇게 하면 외부 작업이 상태 머신의 상태와 동기화되어 복잡한 상태 전환을 간소화할 수 있습니다.</p>
<br>

[invoke 속성]

- src : 데이터 호출하는 문자열 주소
- onDone : 데이터 성공 시 호출
- onError : 데이터 실패 시 호출

<style>
h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

```ts
const fetchData = async () => {
  try {
    const response = await fetch(
      "https://api.edamam.com/api/food-database/v2/parser?app_id=68699a75&app_key=298f71cdd69358ae9f1a0c2f58a09e26&nutrition-type=cooking"
    );

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
```

<style>
h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

##

```ts{1-8|10-15|16-32|1-32}
export const fetchMachine = createMachine<DataContext>({
  id: "data",
  initial: "idle",
  context: {
    data: null,
    error: null,
    retries: 0,
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
          cond: (context) => context.retries < 3,
        },
      },
    },
    success: {
      on: {
        FETCH: "loading",
      },
    },
    error: {
      on: {
        FETCH: "loading",
      },
    },
  },
});
```

<p>context에는 data, error, retries의 초기값이 설정되어 있는데 여기서 retries는 실패한 요청을 재시도하는 횟수를 추적하는 역할을 합니다.</p>
<p>이 값을 사용하여 요청이 여러 번 실패할 때 일정한 횟수만큼만 재시도하도록 구성할 수 있습니다.</p>

<style>
h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

```ts
success: {
  on: {
    FETCH: "loading",
  },
},
error: {
  on: {
    FETCH: "loading",
  },
},
```

<br>

<p>invoke 속성에 데이터 패치 여부에 따라 fetchMachine의 상태를 업데이트합니다.</p>
<p>여기서 다시 초기값으로 상태전환하는 이유는 사용자가 다시 시도할 수 있도록 처리합니다.</p>
<p>success나 error에 타입을 추가하는 경우는 해당 상태가 최종 상태(final state)로 지정되어 머신이 더 이상 진행하지 않도록 하기 위함입니다.</p>
<p>그러나 대부분의 경우 사용자가 다시 시도할 수 있도록 최종 상태 대신 일반 상태를 사용하는 것이 좋습니다.</p>

<style>
h2 {
background-color: #2B90B6;
background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
background-size: 100%;
-webkit-background-clip: text;
-moz-background-clip: text;
-webkit-text-fill-color: transparent;
-moz-text-fill-color: transparent;
}
</style>

---

## Visualizer

<a href="https://xstate.js.org/viz/?gist=12db6a44348ed799fa1472a26d941ddc" target="_blank"> 시각화 </a>

오른쪽에서 코드를 작성하여 넣어주면 왼쪽 화면처럼 시각화하여 보여줍니다.
상태가 가지고 있는 이벤트들과 그 이벤트를 클릭하여 로직 흐름을 확인 할 수 있습니다.
해당 컴포넌트마다의 비지니스 로직의 흐름을 알기 쉬워 다른팀과 협업할 때에도 유용합니다.
하기와 같이 저장하여 url로 공유할 수 있으며, 디버깅을 할 수 있습니다.

---

## Hierarchical state & parallel state (계층적 및 병렬 상태)

<style>
h2 {
background-color: #2B90B6;
background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
background-size: 100%;
-webkit-background-clip: text;
-moz-background-clip: text;
-webkit-text-fill-color: transparent;
-moz-text-fill-color: transparent;
}
</style>

---

## Xstate 강정

<style>
h2 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>
