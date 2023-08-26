import { actions } from "../actions";

export const initialState = {
  orderDetails: null,
  isOrderFetching: false,
  postOrderError: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.POST_ORDER_SUCCESS:
      return {
        ...state,
        orderDetails: action.payload,
        isOrderFetching: false,
        postOrderError: false,
      };
    case actions.POST_ORDER_FAILED:
      return { ...state, ...initialState, postOrderError: action.payload };
    case actions.POST_ORDER_FETCHING:
      return { ...state, isOrderFetching: true, postOrderError: false };

    default:
      return state;
  }
};
