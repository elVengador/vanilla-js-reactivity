type Signal<A> = { action: A };
type Callback<S> = (newState: S) => void;

export const reducer = <S, A>(
  reducer: (state: S, action: A) => S,
  initialState: S,
  name: string
): [(detail: Signal<A>) => void, (cb: Callback<S>) => void] => {
  let state = { ...initialState };
  const callbacks: Callback<S>[] = [];
  const subscribe = (cb: Callback<S>) => callbacks.push(cb);

  window.addEventListener(name, (e) => {
    const newState = reducer(
      state,
      (e as CustomEvent<Signal<A>>).detail.action
    );
    state = newState;
    callbacks.forEach((c) => c(state));
  });

  const dispatch = (detail: Signal<A>) => {
    const customEvent = new CustomEvent<Signal<A>>(name, { detail });
    window.dispatchEvent(customEvent);
  };
  return [dispatch, subscribe];
};
