import { actions } from "../reducer";
import { postOrderApi } from "../../utils/api";

export const postOrder = (request) => async (dispatch) => {
   dispatch({ type: actions.SET_LOADING, payload: true })
   return postOrderApi(request)
      .then(order => {
         dispatch({ type: actions.SET_ORDER_DETAIL, payload: order })
         dispatch({ type: actions.SET_LOADING, payload: false })
      }).catch((err) => {
         dispatch({
            type: actions.GET_INGREDIENTS_FAILED,
            payload: err,
         });
         dispatch({ type: actions.SET_LOADING, payload: false })
         alert("Sorry order error");
      })
}