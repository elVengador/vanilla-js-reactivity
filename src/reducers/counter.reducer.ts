export type CounterState = { counter: number };

type CounterIncrement = { type: "increment" };
type CounterDecrement = { type: "decrement" };

export type CounterActions = CounterIncrement | CounterDecrement;

export const counterReducer = (
  state: CounterState,
  action: CounterActions
): CounterState => {
  if (action.type === "increment") return { counter: state.counter + 1 };
  if (action.type === "decrement") return { counter: state.counter - 1 };
  return state;
};

export const INITIAL_COUNTER: CounterState = { counter: 0 };
