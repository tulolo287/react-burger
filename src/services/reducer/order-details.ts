import { orderActions } from "../constants/order-details";
import { TOrderDetailsActions } from "../actions/order-details";

export const initialState = {
  orderDetails: null,
  isOrderFetching: false,
  postOrderError: false,
  allOrders: null,
  
};

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions) => {
  switch (action.type) {
    case orderActions.POST_ORDER_SUCCESS:
      return {
        ...state,
        orderDetails: action.order,
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
