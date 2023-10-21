import { TMessage } from "../../utils/types";
import { TWSActions, TWSAuthActions } from "../actions/wsActions";
import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE_FAILED,
  WS_GET_MESSAGE_SUCCESS,
  wsActions,
} from "../constants/wsConsts";

type TWSState = {
  wsConnected: boolean;
  messages: TMessage | null;
  fetchMessages: boolean;
  error?: Event;
  wsConnectedAuth: boolean;
  messagesAuth: TMessage | null;
  fetchMessagesAuth: boolean;
  errorAuth?: Event;
};

export const initialState: TWSState = {
  wsConnected: false,
  messages: null,
  fetchMessages: false,
  wsConnectedAuth: false,
  messagesAuth: null,
  fetchMessagesAuth: false,
};

export const wsReducer = (
  state = initialState,
  action: TWSActions | TWSAuthActions
): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        fetchMessages: true,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        fetchMessages: false,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        fetchMessages: false,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSE:
      return {
        ...state,
        error: undefined,
        fetchMessages: false,
        wsConnected: false,
      };

    case WS_GET_MESSAGE_SUCCESS:
      return {
        ...state,
        fetchMessages: false,
        error: undefined,
        messages: action.payload,
      };

    case WS_GET_MESSAGE_FAILED:
  
      return {
        ...state,
        fetchMessages: false,
        error: undefined,
      };

    case wsActions.WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        errorAuth: undefined,
        fetchMessagesAuth: true,
        wsConnectedAuth: true,
      };

    case wsActions.WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        errorAuth: action.payload,
        fetchMessagesAuth: false,
        wsConnectedAuth: false,
      };

    case wsActions.WS_AUTH_CONNECTION_CLOSED:
      return {
        ...state,
        errorAuth: undefined,
        fetchMessagesAuth: false,
        wsConnectedAuth: false,
      };

    case wsActions.WS_AUTH_CONNECTION_CLOSE:
      return {
        ...state,
        errorAuth: undefined,
        fetchMessagesAuth: false,
        wsConnectedAuth: false,
      };

    case wsActions.WS_AUTH_GET_MESSAGE_SUCCESS:
      return {
        ...state,
        fetchMessagesAuth: false,
        errorAuth: undefined,
        messagesAuth: action.payload,
      };

    case wsActions.WS_AUTH_GET_MESSAGE_FAILED:
  
      return {
        ...state,
        fetchMessagesAuth: false,
        errorAuth: undefined,
      };

    default:
      return state;
  }
};
