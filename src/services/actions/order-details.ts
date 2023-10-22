import { postOrderApi } from "../../utils/api";
import { TOrder, TPostOrder } from "../../utils/types";
import { orderActions } from "../constants/order-details";
import { AppDispatch } from "../types";

export interface IOrderFetching {
  readonly type: typeof orderActions.POST_ORDER_FETCHING;
}
export interface IPostOrderSuccess {
  readonly type: typeof orderActions.POST_ORDER_SUCCESS;
  readonly order: TOrder;
}
export interface IPostOrderFailed {
  readonly type: typeof orderActions.POST_ORDER_FAILED;
  readonly err: boolean;
}
export interface ISetOrderFeed {
  readonly type: typeof orderActions.SET_ORDER_FEED;
  readonly payload: { orders: TOrder[]; id: string };
}

export type TOrderDetailsActions =
  | IOrderFetching
  | IPostOrderSuccess
  | ISetOrderFeed
  | IPostOrderFailed;

export const orderFetching = (): IOrderFetching => ({
  type: orderActions.POST_ORDER_FETCHING,
});

export const postOrderSuccess = (order: TOrder): IPostOrderSuccess => ({
  type: orderActions.POST_ORDER_SUCCESS,
  order,
});

export const postOrderFailed = (err: boolean): IPostOrderFailed => ({
  type: orderActions.POST_ORDER_FAILED,
  err,
});

export const setOrderFeed = (payload: {
  orders: TOrder[];
  id: string;
}): ISetOrderFeed => ({
  type: orderActions.SET_ORDER_FEED,
  payload,
});

export const postOrder =
  (request: TPostOrder) => async (dispatch: AppDispatch) => {
    dispatch({ type: orderActions.POST_ORDER_FETCHING });

    return postOrderApi(request)
      .then((response) => {
        dispatch(postOrderSuccess(response.order));
      })
      .catch((err) => {
        dispatch(postOrderFailed(err));
      });
  };
