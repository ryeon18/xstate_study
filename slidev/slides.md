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
  background-color: #EA7FFC;
  background-image: #EA7FFC;
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
  <li>Xstate가 다른 라이브러리랑 다른점</li>
</ol>

<br>
<br>
</div>

<style>
h2 {
  background-color: #EA7FFC;
  background-image: #EA7FFC;
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
<p>Recoil, Jotai, Redux와 같은 상태관리 라이브러리이자 FSM 및 상태 차트를 만들고, 해석할 수 있게 해주는 라이브러리입니다.</p>
<br>
<p>초기 상태와 한정된 수의 이벤트가 있고, 상태와 이벤트가 주어지면 전환 함수가 다음 상태를 결정합니다.</p>
<br>
<br>
<p>FSM (유한상태기계)</p>
<p>인공지능 기법 중 하나로 하나의 상태만을 가집니다.</p>
<p>FSM는 이벤트에 의해 한 상태에서 다른 상태로 변화할 수 있으며, 이를 전이(transition) 이라고 합니다.</p>
<br>
<p>선언적이고 더 가독성 있고 다양한 기능을 포함하는 방법으로 FSM을 사용할 수 있습니다.</p>

<br>
<br>

<style>
h2 {
    background-color: #EA7FFC;
  background-image: #EA7FFC;
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

<p>기본적으로 createMachine 함수를 사용하여 상태머신을 만들고, createMachine에서 상태와 이벤트를 정의합니다.</p>

<style>
  h3{
    color:#A8A8A8
  }
  h2 {
    background-color: #EA7FFC;
  background-image: #EA7FFC;
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  }
</style>

---

```ts{1|2-5|7|9|10-13|14|15|16|17-19|20-30|all}
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
    background-color: #EA7FFC;
  background-image: #EA7FFC;
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

### Visualizer

<p>상태가 가지고 있는 이벤트들과 그 이벤트를 클릭하여 로직 흐름을 확인 할 수 있습니다.</p>
<p>해당 컴포넌트마다의 비지니스 로직의 흐름을 알기 쉬워 다른팀과 협업할 때에도 유용합니다.<br>
하기와 같이 저장하여 url로 공유할 수 있으며, 디버깅을 할 수 있습니다.</p>
<br>
<br>

<a href="https://xstate.js.org/viz/?gist=12db6a44348ed799fa1472a26d941ddc" target="_blank"> Visualizer </a>

<a href="https://stately.ai/registry/editor/7af1ae73-1790-43cd-abf1-578b84f2e38c?machineId=77e6a9f5-0eb0-4a4a-8d41-0be9bcbcb6fc&mode=Simulate">Simulate</a>

<style>
h2 {
    background-color: #EA7FFC;
  background-image: #EA7FFC;
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
    background-color: #EA7FFC;
  background-image: #EA7FFC;
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
h3{
  color:#A8A8A8
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
    background-color: #EA7FFC;
  background-image: #EA7FFC;
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
h3{
  color:#A8A8A8
}
</style>

---

## Xstate 기능

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
    background-color: #EA7FFC;
  background-image: #EA7FFC;
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
    background-color: #EA7FFC;
  background-image: #EA7FFC;
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
h3{
  color:#A8A8A8;
}
/* h3 { text-transform: lowercase; } */
/* h3:first-letter { text-transform: uppercase; } */
</style>

---

### 3. Extending Machines

1. withContext()

```ts
import { createMachine, withContext } from "xstate";

interface Context {
  count: number;
}

const oldMachine = createMachine<Context>({
  id: "oldMachine",
  initial: "idle",
  context: {
    count: 0,
  },
  states: {
    idle: {
      on: {
        CLICK: {
          target: "active",
        },
      },
    },
    active: {},
  },
});
```

<style>
h2 {
    background-color: #EA7FFC;
  background-image: #EA7FFC;
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
h3{
  color:#A8A8A8
}
/* h3 { text-transform: lowercase; } */
/* h3:first-letter { text-transform: uppercase; } */
</style>

---

```ts
const newMachine = withContext(oldMachine, {
  count: 10,
});
```

<p>현재 머신의 컨텍스트를 변경하고, 새로운 머신을 생성합니다. 이 함수는 머신의 컨텍스트를 덮어쓰기 할 때 사용됩니다.</p>
<p>withContext를 통해 만들어진 newMachine의 count 값은 10이 되고, oldMachine은 변하지 않고 0이 됩니다.</p>

<br>

2. withConfig()
   <br>

```ts
import { createMachine, withConfig } from "xstate";

const extendOptMachine = createMachine({
  id: "extendingOptions",
  initial: "idle",
  states: {
    idle: {
      on: {
        CLICK: {
          target: "active",
        },
      },
    },
    active: {},
  },
});
```

<style>
h2 {
    background-color: #EA7FFC;
  background-image: #EA7FFC;
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

```ts
const newMachine = withConfig(extendOptMachine, {
  actions: {
    log: (context, event) => {
      console.log("event", event);
    },
  },
});
```

<p>현재 머신의 옵션을 변경하고, 새로운 머신을 생성합니다. 이 함수는 머신의 옵션을 덮어쓰기 할 때 사용됩니다.</p>
<p>withConfiog를 통해 만들어진 newMachine의  값은 10이 되고, extendOptMachinedms 변하지 않고 0이 됩니다.</p>

<p>상기 두 개 모두 머신상태를 확장시키는 기능을 제공하며, 이를 통해 코드의 재사용성을 높이고 유연성을 확보할 수 있습니다.</p>

<style>
h2 {
    background-color: #EA7FFC;
  background-image: #EA7FFC;
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

### 4. Invoking Services

<br>

<p>상태 머신에서 API 호출 등 비동기 작업을 하는 기능입니다.</p>
<p>invoke 속성을 사용하여 데이터를 가져옵니다.</p>
<p>invoke를 사용하면 외부 작업의 실행이 상태 머신과 동기화되어 상태 전환에 따라 작업을 시작하고 취소할 수 있습니다.</p>
<p>외부 작업이 완료되면 상태 머신은 이를 알리고 결과를 처리하거나 오류를 처리할 수 있습니다. 이렇게 하면 외부 작업이 상태 머신의 상태와 동기화되어 복잡한 상태 전환을 간소화할 수 있습니다.</p>
<br>

[invoke 속성]

- src : 컨텍스트와 이벤트를 인자로 받으며, 데이터 호출하는 문자열된 주소입니다. 외부 리소스를 가져오는 경우에 onDone, onError 이벤트를 통해 비동기 작업이 완료되거나 실패할 때 상태를 업데이트 합니다.
- onDone : 성공적으로 완료될 때 호출됩니다. 결과 데이터를 컨텍스트에 할당하거나 다른 이벤트 발생시키는 등 액션을 수행할 수 있습니다.
- onError : 서비스가 실패했을 때 호출됩니다. 오류를 처리하거나 다른 상태로 전환하는 등의 액션을 수행할 수 있습니다.

<style>
h2 {
    background-color: #EA7FFC;
  background-image: #EA7FFC;
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
h3{
  color:#A8A8A8
}
</style>

---

```ts{1-13|14-19|20-26}
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

<br>

- src에 할당할 데이터를 호출하는 fetchData를 함수를 설정합니다.
- machine의 context와 Data 타입을 만듭니다.

<style>
h2 {
    background-color: #EA7FFC;
  background-image: #EA7FFC;
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
<p></p>
<p>이 값을 사용하여 요청이 여러 번 실패할 때 일정한 횟수만큼만 재시도하도록 구성할 수 있습니다.</p>

<style>
h2 {
    background-color: #EA7FFC;
  background-image: #EA7FFC;
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

<p>invoke 속성에 데이터 패치 여부에 따라 fetchMachine의 상태를 업데이트합니다.</p>
<p>여기서 다시 초기값으로 상태전환하는 이유는 사용자가 다시 시도할 수 있도록 처리합니다.</p>
<p>success나 error에 타입을 추가하는 경우는 해당 상태가 최종 상태(final state)로 지정되어 머신이 더 이상 진행하지 않도록 하기 위함입니다.</p>
<p>그러나 대부분의 경우 사용자가 다시 시도할 수 있도록 최종 상태 대신 일반 상태를 사용하는 것이 좋습니다.</p>

<a href="https://stately.ai/registry/editor/7af1ae73-1790-43cd-abf1-578b84f2e38c?machineId=aa3fe5f6-5d5d-4f97-9bfb-a54bd8bffcd6&mode=Simulate" target="_blank">Simulate</a>

<a href="https://stately.ai/viz/a0416cb3-0036-4fde-9d7e-ccd6de797adb" target="_blank">Visualizer</a>

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

### 5. Hierarchical state & parallel state (계층적 및 병렬 상태)

<br>
<br>

<p><span style="font-weight:bold; font-size:24px">계층적 상태</span>는 상태 머신의 복잡성을 줄이고, 공통 동작을 재사용할 수 있는 기회를 제공합니다.</p>
<br>
<p><span style="font-weight:bold; font-size:24px">병렬 상태</span>는 상태 머신의 여러 상태가 동시에 활성화될 수 있게 해줍니다. 이를 통해 상태 머신의 독립적인 부분을 분리하고, 각 부분이 독립적으로 동작하도록 할 수 있습니다. 병렬 상태는 상태 머신의 모듈성을 높이며, 독립적인 동작을 함께 조합할 수 있는 기회를 제공합니다.</p>
<br>
<br>
<p>계층적 및 병렬 상태를 사용하면 상태 머신의 구조를 더 명확하게 표현할 수 있으며, 복잡한 애플리케이션 로직을 분리하고 관리하기 쉽게 만들 수 있습니다. 이는 코드의 가독성과 유지 관리성을 향상시키는 데 도움이 됩니다.</p>

<a href="https://stately.ai/registry/editor/7af1ae73-1790-43cd-abf1-578b84f2e38c?machineId=77e6a9f5-0eb0-4a4a-8d41-0be9bcbcb6fc&mode=Simulate" target="_blank">Simulate</a>

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
h3{
  color:#A8A8A8
}
</style>

---

```ts{1-9|10-17}
export interface PlayerState {
  player: string;
  volume: string;
  playing: string;
  paused: string;
  stopped: string;
  normal: string;
  muted: string;
}

type PlayerEvent =
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "STOP" }
  | { type: "MUTE" }
  | { type: "UNMUTE" }
  | { type: "BUY" };
```

<br>
<br>
- 머신의 State와 Event의 타입을 지정합니다.

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

<br>
<br>

```ts{5-6|9|6,9|all}
export const PlayerMachine = createMachine<PlayerState, PlayerEvent>({
  id: "player",
  type: "parallel",
  predictableActionArguments: true,
  states: {
    player: {
      initial: "playing",
    },
    volume: {
      initial: "muted",
    },
  },
});
```

<br>
<br>

- 머신의 상태는 player, volume 으로 병렬 상태로 지정합니다.
- 현재 두 개의 독립적인 하위 상태를 동시에 관리하는 상태머신 입니다.

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

<br>
<br>

```ts{1|4,10,16|6,7,12,13,18,19|all}
player: {
      initial: "playing",
      states: {
        playing: {
          on: {
            PAUSE: "paused",
            STOP: "stopped",
          },
        },
        paused: {
          on: {
            PLAY: "playing",
            STOP: "stopped",
          },
        },
        stopped: {
          on: {
            PLAY: "playing",
            PAUSE: "paused",
          },
        },
      },
    },
```

<br>
<br>

- player의 상태는 계층적 상태를 사용하여 playing, paused,stopped 라는 3개의 하위 상태를 가지고 있습니다.
- 각 상태에서 발생하는 이벤트에 따라 다른 상태로 전환됩니다.

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

<br>
<br>

```ts{1,16|6,7,8,21,22,23|all}
  playing: {
    on: {
      PAUSE: "paused",
      STOP: "stopped",
    },
    after: {
      10000: "stopped",
    },
  },
  paused: {
    on: {
      PLAY: "playing",
      STOP: "stopped",
    },
  },
  stopped: {
    on: {
      PLAY: "playing",
      PAUSE: "paused",
    },
    after: {
      5000: "playing",
    },
  },
```

<br>
<br>

- 추가로 playing과 stopped의 상태에서는 after 속성을 추가하였습니다.
- 객체 형태로 지정하며, 키는 시간을 나타내는 number타입니다.
- after속성은 machine이 가지고 있는 delay 기능입니다.
- delay 기능은 상태 전이를 지연시키는 역할을 하며, 일정 시간이 경과한 후에 상태 전이를 실행합니다.

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

```ts{1|4,12|5,6,7,13,14,15|8,9,10,16,17,18|all}
volume: {
      initial: "muted",
      states: {
        muted: {
          on: {
            MUTE: "normal",
          },
          after: {
            5000: "normal",
          },
        },
        normal: {
          on: {
            UNMUTE: "muted",
          },
          after: {
            5000: "muted",
          },
        },
      },
    },
```

<br>

- volume의 상태도 계층적 상태를 사용하고 있으며, normal, muted 2개의 하위 상태를 가지고 있습니다.
- 각 상태에 따른 이벤트들을 가지고 있으며, 상태전이는 매 5초 후에 실행됩니다.

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

<br>

## Xstate가 다른 라이브러리랑 다른점

<br>

- xstate은 상태 머신을 기반으로 동작하며, 애플리케이션의 동작을 상태와 상태 간 전이(Transition)를 정의하는 방식으로 모델링합니다.<br>
  다른 라이브러리는 상태 컨테이너(State Container)를 기반으로 동작하며, 중앙 집중화된 데이터 스토어를 제공합니다.<br>
  따라서 전역 스토어를 사용하거나 Provider로 래핑할 필요가 없습니다.

## Xstate 사용하면 좋은점

<br>

- XState를 이용하면 코드를 시각화 할 수 있기 때문에 데이터와 상태를 명확히 구분하고, 상태의 흐름과 상태의 전이조건, 사이드이팩트의 실행 구조 등이 한 눈에 보이도록 복잡한 구조를 처리하는 데에 도움이 됩니다. (시각화를 함으로써 다른팀과의 협업에 도움이 됩니다.)
- Xstate은 다양한 도구를 제공합니다.
  복합 상태 및 상태 머신이 현재 어떤 상태에 있는지 추적을 할 수 있습니다.
- 상태머신을 확장시키는 기능을 가지고 있어 코드의 재사용성을 높이고 유연성을 높일 수 있습니다.

<style>
h2 {
    background-color: #EA7FFC;
  background-image: #EA7FFC;
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>
