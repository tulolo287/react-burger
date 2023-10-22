import { TMessage } from "../../utils/types";
import { wsActions } from "../constants/wsConsts";

export interface IWSConnectionStart {
  readonly type: typeof wsActions.WS_CONNECTION_START;
  readonly url: string;
}

export interface IWSConnectionSuccess {
  readonly type: typeof wsActions.WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionError {
  readonly type: typeof wsActions.WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosed {
  readonly type: typeof wsActions.WS_CONNECTION_CLOSED;
}

export interface IWSConnectionClose {
  readonly type: typeof wsActions.WS_CONNECTION_CLOSE;
}

export interface IWSGetMessageAction {
  readonly type: typeof wsActions.WS_GET_MESSAGE_SUCCESS;
  readonly payload: TMessage;
}

export interface IWSGetMessageFailed {
  readonly type: typeof wsActions.WS_GET_MESSAGE_FAILED;
}

export interface IWSSendMessage {
  readonly type: typeof wsActions.WS_SEND_MESSAGE;
  readonly payload: { message: string };
}

export interface IWSAuthConnectionStart {
  readonly type: typeof wsActions.WS_AUTH_CONNECTION_START;
  readonly url: string;
}

export interface IWSAuthConnectionSuccess {
  readonly type: typeof wsActions.WS_AUTH_CONNECTION_SUCCESS;
}

export interface IWSAuthConnectionError {
  readonly type: typeof wsActions.WS_AUTH_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSAuthConnectionClosed {
  readonly type: typeof wsActions.WS_AUTH_CONNECTION_CLOSED;
}

export interface IWSAuthConnectionClose {
  readonly type: typeof wsActions.WS_AUTH_CONNECTION_CLOSE;
}

export interface IWSAuthGetMessage {
  readonly type: typeof wsActions.WS_AUTH_GET_MESSAGE_SUCCESS;
  readonly payload: TMessage;
}

export interface IWSAuthGetMessageFailed {
  readonly type: typeof wsActions.WS_AUTH_GET_MESSAGE_FAILED;
}

export interface IWSAuthSendMessage {
  readonly type: typeof wsActions.WS_AUTH_SEND_MESSAGE;
  readonly payload: { message: string };
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSGetMessageAction
  | IWSGetMessageFailed
  | IWSConnectionClose
  | IWSSendMessage;

export type TWSAuthActions =
  | IWSAuthConnectionStart
  | IWSAuthConnectionSuccess
  | IWSAuthConnectionError
  | IWSAuthConnectionClosed
  | IWSAuthGetMessage
  | IWSAuthGetMessageFailed
  | IWSAuthConnectionClose
  | IWSAuthSendMessage;

export const wsStart = (url: string): IWSConnectionStart => ({
  type: wsActions.WS_CONNECTION_START,
  url,
});

export const wsAuthStart = (url: string): IWSAuthConnectionStart => ({
  type: wsActions.WS_AUTH_CONNECTION_START,
  url,
});
