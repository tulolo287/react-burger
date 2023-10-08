import type { Middleware, MiddlewareAPI } from "redux";
import type { Actions } from "../actions";
import { wsActions } from "../constants/wsConsts";
import type { AppDispatch, State } from "../types";


export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, State>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: Actions) => {
      const { dispatch, getState } = store;
      const { type } = action;

      if (type === wsActions.WS_CONNECTION_START) {
        socket = new WebSocket(action.url);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: wsActions.WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: wsActions.WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          if (success) {
            dispatch({
              type: wsActions.WS_GET_MESSAGE_SUCCESS,
              payload: { ...restParsedData },
            });
          } else {
            dispatch({
              type: wsActions.WS_GET_MESSAGE_FAILED,
            });
          }
        };

        socket.onclose = (event) => {
          dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
        };

        if (type === "WS_SEND_MESSAGE") {
          const payload = action.payload;
          const message = { ...payload, token: "user?.token" };
          socket.send(JSON.stringify(message));
        }

        if (type === wsActions.WS_CONNECTION_CLOSE) {
          socket.close();
        }
      }

      next(action);
    };
  }) as Middleware;
};

export const getOrders = async () => {};

