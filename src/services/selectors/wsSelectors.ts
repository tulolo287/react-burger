import { State } from "../types";

export const getMessages = (store: State) => store.wsReducer.messages;
export const getFetchMessages = (store: State) => store.wsReducer.fetchMessages;
export const getWsConnected = (store: State) => store.wsReducer.wsConnected;
