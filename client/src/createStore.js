import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reducers from "./reducers";

export const middlewares = [promise];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export const store = createStoreWithMiddleware(reducers)