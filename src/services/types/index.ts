import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../store";
import { Actions } from "../actions";
import { Action, ActionCreator } from "redux";

export type IMessage = {
   
}
export type State = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<State, any, Actions>;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, State, Actions>
>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, State, unknown, Actions>;