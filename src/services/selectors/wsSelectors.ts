import { State } from "../types";

export const selectWSMessages = (store: State) => store.wsReducer.messages;
export const selectWSMessagesAuth = (store: State) => store.wsReducer.messagesAuth;
export const getFetchMessages = (store: State) => store.wsReducer.fetchMessages;
export const getWsConnected = (store: State) => store.wsReducer.wsConnected;
