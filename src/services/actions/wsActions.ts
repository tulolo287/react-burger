import { TMessage } from "../../utils/types";
import { wsActions } from "../constants/wsConsts";

export interface IWSConnectionStart {
  readonly type: typeof wsActions.WS_CONNECTION_START;
  readonly url: string;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof wsActions.WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof wsActions.WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof wsActions.WS_CONNECTION_CLOSED;
}

export interface IWSConnectionClose {
  readonly type: typeof wsActions.WS_CONNECTION_CLOSE;
}

export interface IWSGetMessageAction {
  readonly type: typeof wsActions.WS_GET_MESSAGE_SUCCESS;
  readonly payload: TMessage;
}

export interface IWSGetMessageActionFailed {
  readonly type: typeof wsActions.WS_GET_MESSAGE_FAILED;
}

export interface IWSSendMessageAction {
  readonly type: typeof wsActions.WS_SEND_MESSAGE;
  readonly payload: { message: string };
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSGetMessageActionFailed
  | IWSConnectionClose
  | IWSSendMessageAction;
