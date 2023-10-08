//import { getCurrentTimestamp } from "../../utils/datetime";
import { TWSActions } from "../actions/wsActions";
import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE_FAILED,
  WS_GET_MESSAGE_SUCCESS,
} from "../constants/wsConsts";

type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
} | null;

type TMessages = {
  orders: TOrder[] | null;
  total: number;
  totalToday: number;
};

type TWSState = {
  wsConnected: boolean;
  messages: TMessages | null;
  fetchMessages: boolean;
  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  messages: null,
  fetchMessages: false,
};

export const wsReducer = (
  state = initialState,
  action: TWSActions
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

    default:
      return state;
  }
};
