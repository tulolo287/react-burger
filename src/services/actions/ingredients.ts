import { getIngredientsApi } from "../../utils/api";
import { actions } from ".";
import { AppDispatch, State } from "../..";

export const ingredientsActions = {
  GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS",
  GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED",
  SET_SORTED_INGREDIENTS: "SET_All_INGREDIENTS",
  SET_INGREDIENT_DETAILS: "SET_INGREDIENT_DETAILS",
  INCREASE_INGREDIENT_QTY: "INCREASE_INGREDIENT_QTY",
  DECREASE_INGREDIENT_QTY: "DECREASE_INGREDIENT_QTY",
  INGREDIENTS_FETCHING: "INGREDIENTS_FETCHING",
};

export const getIngredients = () => async (dispatch: AppDispatch) => {
  dispatch({ type: actions.INGREDIENTS_FETCHING, payload: true });
  return getIngredientsApi()
    .then((response) => {
      dispatch({
        type: actions.GET_INGREDIENTS_SUCCESS,
        payload: response.data
      });
      return response.data;
    })
    .catch((err) => {
      dispatch({
        type: actions.GET_INGREDIENTS_FAILED,
        payload: err,
      });
    });
};

const ingredients = (state: State) => state.ingredientsReducer.ingredients;
export const getIngredientsSelector = (state: State) =>
  state.ingredientsReducer.ingredients;
export const getSortedIngredientsSelector = (state: State) =>
  state.ingredientsReducer.sortedIngredients;
export const getIngredientDetailSelector = (state: State) =>
  state.ingredientDetailsReducer.ingredientDetails;
