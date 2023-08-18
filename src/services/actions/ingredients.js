import { actions } from "../actions";
import { getIngredientsApi } from "../../utils/api";
import { v4 as uuidv4 } from "uuid";

export const ingredientsActions = {
  GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS",
  GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED",
  SET_SORTED_INGREDIENTS: "SET_All_INGREDIENTS",
  SET_INGREDIENT_DETAILS: "SET_INGREDIENT_DETAILS",
  INCREASE_INGREDIET_QTY: "INCREASE_INGREDIET_QTY",
  DECREASE_INGREDIET_QTY: "DECREASE_INGREDIET_QTY",
  DATA_FETCHING: "DATA_FETCHING",
};

export const getIngredients = () => async (dispatch) => {
  dispatch({ type: actions.DATA_FETCHING, payload: true });
  return getIngredientsApi()
    .then((ingredients) => {
      dispatch({
        type: actions.GET_INGREDIENTS_SUCCESS,
        payload: ingredients,
      });
      const bun = ingredients.find((item) => item.type === "bun");
      dispatch({ type: actions.SET_BUN, payload: bun });
      dispatch({
        type: actions.ADD_BUN_TO_BURGER,
        payload: { ...bun, key: uuidv4() },
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.GET_INGREDIENTS_FAILED,
        payload: err,
      });
    });
};
