import { applyMiddleware, compose, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "../Reducers/index";
export const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
