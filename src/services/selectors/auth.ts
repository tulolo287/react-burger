import { State } from "../types";

export const getUser = (store: State) => store.authReducer.user;
export const getUserLoading = (store: State) => store.authReducer.isLoading;
