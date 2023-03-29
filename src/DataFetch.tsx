import React, { useMemo } from "react";
import { fetchMachine } from "./DataFetchMachine";
import { useMachine } from "@xstate/react";
import { Link } from "react-router-dom";

export interface Item {
  food: {
    category: string;
    categoryLabel: string;
    foodId: string;
    image: string;
    knownAs: string;
    label: string;
    nutrients: {};
  };
  measures: [{ label: string; uri: string; weight: number }];
}

export const ShowData = () => {
  const Machine = useMemo(() => fetchMachine, []);
  const [state, send] = useMachine(Machine);

  return (
    <div className="wrap data-fatch">
      <h2>Fetch Data</h2>
      <button onClick={() => send("FETCH")} className="fetch">
        Fetch
      </button>
      <Link to="/" className="back">
        Go back
      </Link>
      <div className="data">
        {state.matches("success") && (
          <div>
            {state.context.data?.hints?.slice(0, 10).map((item: Item) => {
              const { food } = item;
              return (
                <div key={food.foodId}>
                  <h2>{food.label}</h2>
                  <img alt={food.knownAs} src={food.image} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
