import { getIngredientsApi } from "../../utils/api";
import { TIngredient } from "../../utils/types";
import { ingredientsActions } from "../constants/ingredients";
import { AppDispatch, State } from "../types";

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
export interface IIncreaseIngredientQty {
  readonly type: typeof ingredientsActions.INCREASE_INGREDIENT_QTY;
  ingredient: TIngredient;
}
export interface IIncreaseBunQty {
  readonly type: typeof ingredientsActions.INCREASE_BUN_QTY;
  ingredient: TIngredient;
}
export interface IDecreaseIngredientQty {
  readonly type: typeof ingredientsActions.DECREASE_INGREDIENT_QTY;
  item: TIngredient;
}
export interface ISetSortedIngredients {
  readonly type: typeof ingredientsActions.SET_SORTED_INGREDIENTS;
  ingredients: TIngredient[];
}

export type TIngredientsActions =
  | IIngredientsFetching
  | IGetIngredientsSuccess
  | IGetIngredientsFailed
  | IIncreaseIngredientQty
  | IDecreaseIngredientQty
  | IIncreaseBunQty
  | ISetSortedIngredients;

export const setSortedIngredients = (
  ingredients: TIngredient[]
): ISetSortedIngredients => ({
  type: ingredientsActions.SET_SORTED_INGREDIENTS,
  ingredients,
});

export const decreaseIngredientQty = (
  item: TIngredient
): IDecreaseIngredientQty => ({
  type: ingredientsActions.DECREASE_INGREDIENT_QTY,
  item,
});

export const ingredientsFetching = (): IIngredientsFetching => ({
  type: ingredientsActions.INGREDIENTS_FETCHING,
});

export const getIngredientsSuccess = (
  ingredients: TIngredient[]
): IGetIngredientsSuccess => ({
  type: ingredientsActions.GET_INGREDIENTS_SUCCESS,
  ingredients,
});

export const getIngredientsFailed = (err: any): IGetIngredientsFailed => ({
  type: ingredientsActions.GET_INGREDIENTS_FAILED,
  err,
});

export const increaseIngredientQty = (
  ingredient: TIngredient
): IIncreaseIngredientQty => ({
  type: ingredientsActions.INCREASE_INGREDIENT_QTY,
  ingredient,
});

export const increaseBunQty = (
  ingredient: TIngredient
): IIncreaseBunQty => ({
  type: ingredientsActions.INCREASE_BUN_QTY,
  ingredient,
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
