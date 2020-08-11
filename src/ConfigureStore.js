import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from "./reducers/CombineReducers";

const loggerMiddleware = createLogger();
export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  return createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        loggerMiddleware
      )
    )
  );
}
