import { assign, createMachine } from "xstate";

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://api.edamam.com/api/food-database/v2/parser?app_id=68699a75&app_key=298f71cdd69358ae9f1a0c2f58a09e26&nutrition-type=cooking"
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

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
            (context, event) => console.log(event.data),
          ],
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
