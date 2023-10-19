import { AppDispatch } from "../types";
import { postOrderApi } from "../../utils/api";
import { orderActions } from "../constants/order-details";
import { TOrder } from "../../utils/types";

export interface IOrderFetching {
  readonly type: typeof orderActions.POST_ORDER_FETCHING;
}
export interface IPostOrderSuccess {
  readonly type: typeof orderActions.POST_ORDER_SUCCESS;
  readonly order: any;
}
export interface IPostOrderFailed {
  readonly type: typeof orderActions.POST_ORDER_FAILED;
  readonly err: any;
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

export const postOrderSuccess = (order: any): IPostOrderSuccess => ({
  type: orderActions.POST_ORDER_SUCCESS,
  order,
});

export const postOrderFailed = (err: any): IPostOrderFailed => ({
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

export const postOrder = (request: any) => async (dispatch: AppDispatch) => {
  dispatch({ type: orderActions.POST_ORDER_FETCHING });

  return postOrderApi(request)
    .then((order) => {
      dispatch(postOrderSuccess(order));
    })
    .catch((err) => {
      dispatch(postOrderFailed(err));
    });
};
