import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { rootReducer } from "./reducer";
import { wsActionsAuthMiddleware, wsActionsMiddleware } from "./constants/wsConsts";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActionsMiddleware), socketMiddleware(wsActionsAuthMiddleware)));

export const store = createStore(rootReducer, enhancer);

