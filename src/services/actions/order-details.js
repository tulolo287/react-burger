import { actions } from "../actions";
import { postOrderApi } from "../../utils/api";

export const orderActions = {
  POST_ORDER_SUCCESS: "POST_ORDER_SUCCESS",
  POST_ORDER_FAILED: "POST_ORDER_FAILED",
  POST_ORDER_FETCHING: "POST_ORDER_FETCHING",
};

export const postOrder = (request) => async (dispatch) => {
  dispatch({ type: actions.POST_ORDER_FETCHING });
  return postOrderApi(request)
    .then((order) => {
      dispatch({ type: actions.POST_ORDER_SUCCESS, payload: order });
    })
    .catch((err) => {
      dispatch({
        type: actions.POST_ORDER_FAILED,
        payload: err,
      });
    });
};
