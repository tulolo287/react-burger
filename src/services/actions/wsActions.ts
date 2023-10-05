import { actions } from '../constants';
import {
  wsActions
} from '../constants/wsConsts';
//import type { AppDispatch, IMessage} from '../types';


export interface IWSConnectionStart {
  readonly type: typeof wsActions.WS_CONNECTION_START;
  readonly payload: string;
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

export interface IWSGetMessageAction {
  readonly type: typeof wsActions.WS_GET_MESSAGE;
  readonly payload: any;
}

export interface IWSSendMessageAction {
  readonly type: typeof wsActions.WS_SEND_MESSAGE;
  readonly payload: {message: string};
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSSendMessageAction;




