import { actions } from "../reducer";
import { getIngredientsApi } from "../../utils/api";
import { v4 as uuidv4 } from "uuid";


export const getIngredients = (url) => async (dispatch) => {
   dispatch({ type: actions.DATA_FETCHING, payload: true });
   return getIngredientsApi(url)
      .then((ingredients) => {
         dispatch({
            type: actions.GET_INGREDIENTS_SUCCESS,
            payload: ingredients,
         });
         const bun = ingredients.find((item) => item.type === "bun");
         dispatch({ type: actions.SET_BUN, payload: bun });
         dispatch({ type: actions.ADD_BUN_TO_BURGER, payload: { ...bun, key: uuidv4() } });
      }).catch((err) => {
         dispatch({
            type: actions.GET_INGREDIENTS_FAILED,
            payload: err,
         });
      });
};