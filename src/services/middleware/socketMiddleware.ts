
import type { Middleware, MiddlewareAPI } from "redux";
import { Actions } from "../actions";
import type { AppDispatch, State } from "../types";
import { wsActions } from "../constants/wsConsts";

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, State>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: Actions) => {
      const { dispatch, getState } = store;
      const { type } = action;

   //   const { user } = getState().authReducer.user;
      const accessToken = localStorage.getItem('accessToken');
const user = null;

      if (type === wsActions.WS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}/all`);
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
      }

      next(action);
    };
  }) as Middleware;
};

export const getOrders = async () => {

}
