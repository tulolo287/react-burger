import { getIngredientsApi } from "../../utils/api";
import { actions } from ".";
import { AppDispatch, State } from "../..";
import { ingredientsActions } from "../constants/ingredients";
import { TIngredient } from "../../utils/types";



export interface IIngredientsFetching {
  readonly type: typeof ingredientsActions.INGREDIENTS_FETCHING;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof ingredientsActions.GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}
export interface IGetIngredientsFailed {
  readonly type: typeof ingredientsActions.GET_INGREDIENTS_FAILED;
  readonly err: any;
}

export const ingredientsFetching = (): IIngredientsFetching => ({
  type: ingredientsActions.INGREDIENTS_FETCHING,
});

export const getIngredientsSuccess = (ingredients: TIngredient[]): IGetIngredientsSuccess => ({
  type: ingredientsActions.GET_INGREDIENTS_SUCCESS,
  ingredients,
});

export const getIngredientsFailed = (err: any): IGetIngredientsFailed => ({
  type: ingredientsActions.GET_INGREDIENTS_FAILED,
  err,
});

export const getIngredients = () => async (dispatch: AppDispatch) => {
  dispatch(ingredientsFetching());
  return getIngredientsApi()
    .then((response) => {
      dispatch(getIngredientsSuccess(response.data));
      return response.data;
    })
    .catch((err) => {
      dispatch(getIngredientsFailed(err));
    });
};

const ingredients = (state: State) => state.ingredientsReducer.ingredients;
export const getIngredientsSelector = (state: State) =>
  state.ingredientsReducer.ingredients;
export const getSortedIngredientsSelector = (state: State) =>
  state.ingredientsReducer.sortedIngredients;
export const getIngredientDetailSelector = (state: State) =>
  state.ingredientDetailsReducer.ingredientDetails;
