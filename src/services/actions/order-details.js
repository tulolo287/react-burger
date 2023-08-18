import { actions } from "../reducer";
import { postOrderApi } from "../../utils/api";

export const postOrder = (request) => async (dispatch) => {
   dispatch({ type: actions.POST_ORDER_FETCHING })
   return postOrderApi(request)
      .then(order => {
         dispatch({ type: actions.POST_ORDER_SUCCES, payload: order })
      }).catch((err) => {
         dispatch({
            type: actions.POST_ORDER_FAILED,
            payload: err,
         });
      })
}