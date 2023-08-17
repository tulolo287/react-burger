import { actions } from "../reducer";
import { getIngredientsApi } from "../../utils/api";


export const getIngredients = (url) => async (dispatch) => {
   dispatch({ type: actions.SET_LOADING, payload: true });
   return getIngredientsApi(url)
      .then((ingredients) => {
         dispatch({
            type: actions.GET_INGREDIENTS_SUCCESS,
            payload: ingredients,
         });
         const bun = ingredients.find((item) => item.type === "bun");
         dispatch({ type: actions.SET_BUN, payload: bun });
         dispatch({ type: actions.ADD_BUN_TO_BURGER, payload: bun });
         dispatch({ type: actions.SET_LOADING, payload: false });
      }).catch((err) => {
         dispatch({
            type: actions.GET_INGREDIENTS_FAILED,
            payload: err,
         });
         dispatch({ type: actions.SET_LOADING, payload: false });
      });
};