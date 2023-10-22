import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../store";
import { Actions } from "../actions";
import { Action, ActionCreator } from "redux";

export type IMessage = {};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<State, unknown, Actions>;


// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, State, Actions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена

