import { TOrder } from "../../utils/types";
import { TOrderDetailsActions } from "../actions/order-details";
import { orderActions } from "../constants/order-details";

type TOrderDetailsState = {
  orderDetails: TOrder | undefined;
  isOrderFetching: boolean;
  postOrderError: boolean;
};

export const initialState: TOrderDetailsState = {
  orderDetails: undefined,
  isOrderFetching: false,
  postOrderError: false,
};

export const orderDetailsReducer = (
  state = initialState,
  action: TOrderDetailsActions
) => {
  switch (action.type) {
    case orderActions.POST_ORDER_SUCCESS:
      return {
        ...state,
        orderDetails: action.order,
        isOrderFetching: false,
        postOrderError: false,
      };
    case orderActions.SET_ORDER_FEED:
      const orderInfo = action?.payload.orders.find(
        (item) => item?._id === action.payload.id
      );

      return {
        ...state,
        isOrderFetching: false,
        postOrderError: false,
      };
    case orderActions.POST_ORDER_FAILED:
      return { ...state, ...initialState, postOrderError: action.err };
    case orderActions.POST_ORDER_FETCHING:
      return { ...state, isOrderFetching: true, postOrderError: false };

    default:
      return state;
  }
};
