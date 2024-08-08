import { reducer } from "./reducer.utils";
import {
  CounterActions,
  counterReducer,
  CounterState,
  INITIAL_COUNTER,
} from "./reducers/counter.reducer";
import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1 id="title">Vite + TypeScript + JX</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

const onUpdateButton = (newCounter: number) => {
  const buttonElement = document.querySelector("#counter") as HTMLElement;
  if (buttonElement) buttonElement.innerText = newCounter.toString();
};

const onUpdateTitle = (newCounter: number) => {
  const titleElement = document.querySelector("#title") as HTMLHeadingElement;
  titleElement.innerText = `Vite + TypeScript + JX {${newCounter.toString()}}`;
};

document.addEventListener("DOMContentLoaded", () => {
  const [dispatch, subscribe] = reducer<CounterState, CounterActions>(
    counterReducer,
    INITIAL_COUNTER,
    "counter"
  );

  const onSetUpButton = () => {
    const buttonElement = document.querySelector("#counter") as HTMLElement;
    if (buttonElement)
      buttonElement.addEventListener("click", () =>
        dispatch({ action: { type: "increment" } })
      );
    subscribe((v) => onUpdateButton(v.counter));
  };

  const onSetUpTitle = () => {
    subscribe((v) => onUpdateTitle(v.counter));
  };

  onSetUpButton();
  onSetUpTitle();
  onUpdateButton(INITIAL_COUNTER.counter);
  onUpdateTitle(INITIAL_COUNTER.counter);
});
