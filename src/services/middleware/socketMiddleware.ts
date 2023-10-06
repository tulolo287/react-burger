
import type { Middleware, MiddlewareAPI } from "redux";
import { TWSActions } from "../actions/wsActions";
import type { Actions } from "../actions";
import type { AppDispatch, State } from "../types";
import { wsActions } from "../constants/wsConsts";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, State>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: Actions) => {
      const { dispatch, getState } = store;
      const { type } = action;

   //   const { user } = getState().authReducer.user;
      const accessToken = localStorage.getItem('accessToken');
const user = null;

      if (type === wsActions.WS_CONNECTION_START) {
       // socket = new WebSocket(`${wsUrl}/all`);
         socket = new WebSocket(action.url);
      
      } 
        
      
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: "WS_GET_MESSAGE", payload: { ...restParsedData } });
        };
          
      

        socket.onclose = (event) => {
          dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
        };

        if (type === "WS_SEND_MESSAGE") {
          const message = "payload";
          socket.send(JSON.stringify(message));
        }


        if (type === "WS_SEND_MESSAGE") {
          
          const payload = action.payload;
          const message = { ...(payload ), token: "user?.token" };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};

export const getOrders = async () => {

}


/*
import type { Middleware, MiddlewareAPI } from 'redux';

import type {
  AppActions,
  TWSStoreActions,
  IMessage,
  AppDispatch,
  RootState,
  IMessageResponse,
} from '../types';
//import { getCurrentTimestamp } from '../../utils/datetime';

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: AppActions) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      //const { user } = getState().user;
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: IMessageResponse = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: { ...restParsedData, timestamp: "getCurrentTimestamp()" } });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const payload = action.payload;
          const message = { ...(payload as IMessage), token: "user?.token" };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
*/