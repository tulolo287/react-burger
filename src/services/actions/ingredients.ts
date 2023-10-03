import { getIngredientsApi } from "../../utils/api";
import { actions } from ".";
import { AppDispatch, State } from "../..";
import { ingredientsActions } from "../constants/ingredients";
import { TIngredient } from "../../utils/types";


export interface IIngredientsFetching {
  readonly type: typeof ingredientsActions.INGREDIENTS_FETCHING;
}

export const ingredientsFetching = (): IIngredientsFetching => ({
  type: ingredientsActions.INGREDIENTS_FETCHING,
});


export interface IGetIngredientsSuccess {
  readonly type: typeof ingredientsActions.GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}

export const loginSuccess = (ingredients: TIngredient[]): IGetIngredientsSuccess => ({
  type: ingredientsActions.GET_INGREDIENTS_SUCCESS,
  ingredients,
});

export interface ILoginFailed {
  readonly type: typeof authActions.LOGIN_FAILED;
  readonly err: any;
}

export const loginFailed = (err: any): ILoginFailed => ({
  type: authActions.LOGIN_FAILED,
  err,
});

export const getIngredients = () => async (dispatch: AppDispatch) => {
  dispatch(ingredientsFetching());
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
