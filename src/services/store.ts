
import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
  ActionCreator,
  Action,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { Provider } from "react-redux";
import { rootReducer } from "./reducer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Actions } from "./actions";
import { socketMiddleware } from "./middleware/socketMiddleware";




declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware("lll")))
);


export type State = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<State, any, Actions>;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, State, Actions>
>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, State, unknown, Actions>;
