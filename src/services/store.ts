import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducer";
import { socketMiddleware } from "./middleware/socketMiddleware";
//import { wsActions } from "./constants/wsConsts";


const wsUrl: string = "wss://norma.nomoreparties.space/orders";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware()));

//export const store = createStore(rootReducer, enhancer);

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, wsActions))) // Ваш код здесь
);