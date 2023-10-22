import type { Middleware } from "redux";
import { TWSMiddlewareActions } from "../../utils/types";

export const socketMiddleware = (
  wsActions: TWSMiddlewareActions
): Middleware => {
  return ((store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsStart,
        wsOpen,
        wsClose,
        wsError,
        wsGetMessage,
        wsGetMessageFailed,
        wsSendMessage,
      } = wsActions;

      if (type === wsStart && !socket) {
        socket = new WebSocket(action.url);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: wsOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: wsError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          if (success) {
            dispatch({
              type: wsGetMessage,
              payload: { ...restParsedData },
            });
          } else {
            dispatch({
              type: wsGetMessageFailed,
            });
          }
        };

        socket.onclose = (event) => {
          dispatch({ type: wsClose, payload: event });
          socket = null;
        };

        if (type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }

        if (type === wsClose) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  }) as Middleware;
};

export const getOrders = async () => {};
