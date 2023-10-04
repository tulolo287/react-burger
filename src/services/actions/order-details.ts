import { AppDispatch } from "../types";
import { postOrderApi } from "../../utils/api";
import { orderActions } from "../constants/order-details";

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

export type TOrderDetailsActions =
  | IOrderFetching
  | IPostOrderSuccess
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
