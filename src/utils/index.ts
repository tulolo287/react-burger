import { actions } from "../services/constants";
import { AppDispatch } from "../services/types";

export const startWS = (url: string) => (dispatch: AppDispatch) => {
  dispatch({ type: actions.WS_CONNECTION_START, url });
};
