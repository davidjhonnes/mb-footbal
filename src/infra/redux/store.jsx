import { createStore } from "redux";
import { loadState } from "./localstorage";

const persistedState = loadState();
const store = createStore(
  app,
  persistedState
);
store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  });
});