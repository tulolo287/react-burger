import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../store";
import { Actions } from "../actions";
import { Action, ActionCreator } from "redux";

export type IMessage = {};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<State, unknown, Actions>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  State,
  unknown,
  Actions
>;
