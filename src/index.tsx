import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
  ActionCreator,
  Action,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { actions } from "./services/actions";
import { socketMiddleware } from "./services/middleware/socketMiddleware";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware("lll")))
);

type TApplicationActions = typeof actions;

export const state = store.getState();
export type State = typeof state;
export type Actions = typeof actions;
export type AppDispatch = ThunkDispatch<State, any, AnyAction>;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, State, AnyAction>
>;


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DndProvider>
    </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//                  qqkfofo8ifo930fq@qqq.com     ffgffgf@fgdgf.com
reportWebVitals();
