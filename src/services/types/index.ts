import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../store";
import { AppActions } from "../actions";
import { Action, ActionCreator } from "redux";

export type IMessage = {
   
}

export type AppActions = | TConstructorActions
| TAuthActions
| TIngredientsActions
| TOrderDetailsActions
| TWSActions;;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;
