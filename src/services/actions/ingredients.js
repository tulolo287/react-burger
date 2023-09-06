import { getIngredientsApi } from "../../utils/api";
import { actions } from "../actions";

export const ingredientsActions = {
  GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS",
  GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED",
  SET_SORTED_INGREDIENTS: "SET_All_INGREDIENTS",
  SET_INGREDIENT_DETAILS: "SET_INGREDIENT_DETAILS",
  INCREASE_INGREDIENT_QTY: "INCREASE_INGREDIENT_QTY",
  DECREASE_INGREDIENT_QTY: "DECREASE_INGREDIENT_QTY",
  INGREDIENTS_FETCHING: "INGREDIENTS_FETCHING",
};

export const getIngredients = () => async (dispatch) => {
  dispatch({ type: actions.INGREDIENTS_FETCHING, payload: true });
  return getIngredientsApi()
    .then((ingredients) => {
      dispatch({
        type: actions.GET_INGREDIENTS_SUCCESS,
        payload: ingredients,
      });
      return ingredients;
    })
    .catch((err) => {
      dispatch({
        type: actions.GET_INGREDIENTS_FAILED,
        payload: err,
      });
    });
};

const ingredients = (state) => state.ingredientsReducer.ingredients;
export const getIngredientsSelector = (state) =>
  state.ingredientsReducer.ingredients;
export const getSortedIngredientsSelector = (state) =>
  state.ingredientsReducer.sortedIngredients;
export const getIngredientDetailSelector = (state) =>
  state.ingredientDetailsReducer.ingredientDetails;
