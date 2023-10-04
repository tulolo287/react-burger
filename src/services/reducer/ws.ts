//import { getCurrentTimestamp } from "../../utils/datetime";
import { TWSActions } from "../actions/wsActions";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../constants/wsConsts";
//import type { IMessage, TWSActions } from '../types';

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

  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  messages: null,
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: 
         action.payload,
        
      };

    default:
      return state;
  }
};
