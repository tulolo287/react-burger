import { actions } from "../services/constants";
import { AppDispatch } from "../services/types";

export const getYesterday = (createdAt: Date | string): boolean => {
  return new Date().getTime() / 1000 - new Date(createdAt).getTime() / 1000 <
    86400
    ? true
    : false;
};

export const startWS = (url: string) => (dispatch: AppDispatch) => {
  dispatch({ type: actions.WS_CONNECTION_START, url });
};
