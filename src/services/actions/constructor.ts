import { constructorActions } from "../constants/constructor";


export interface IAddIngredientToConstructor {
  readonly type: typeof constructorActions.;
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