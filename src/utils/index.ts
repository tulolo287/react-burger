import { actions } from "../services/constants";
import { AppDispatch } from "../services/types";

export const startWS = (url: string) => (dispatch: AppDispatch) => {
  dispatch({ type: actions.WS_CONNECTION_START, url });
};

export const getOrderStatus = (status: string | undefined): string => {
    let orderStatus: string = "";
    switch (status) {
      case "done":
        orderStatus = "Выполнен";
        return orderStatus;
      case "pending":
        orderStatus = "Готовится";
        return orderStatus;
    }
    return "Создан";
  };
