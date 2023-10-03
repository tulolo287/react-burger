import { TIngredient } from "../../utils/types";
import { constructorActions } from "../constants/constructor";

export interface IAddIngredientToConstructor {
  readonly type: typeof constructorActions.ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly ingredient: TIngredient;
}
export interface IAddBuntToConstructor {
  readonly type: typeof constructorActions.ADD_BUN_TO_CONSTRUCTOR;
  readonly bun: TIngredient;
}
export interface IChangeConstructorIngredient {
  readonly type: typeof constructorActions.ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly ingredient: TIngredient;
}
export interface IRemoveIngredientConstructor {
  readonly type: typeof constructorActions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly ingredient: TIngredient;
}

export const removeIngredientConstructor = (
  ingredient: TIngredient,
): IRemoveIngredientConstructor => ({
  type: constructorActions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  ingredient,
});

export const changeConstructorIngredient = (
  ingredient: TIngredient,
): IChangeConstructorIngredient => ({
  type: constructorActions.CHANGE_CONSTRUCTOR_INGREDIENT,
  ingredient,
});

export const addIngredientToConstructor = (
  ingredient: TIngredient,
): IAddIngredientToConstructor => ({
  type: constructorActions.ADD_INGREDIENT_TO_CONSTRUCTOR,
  ingredient,
});

export const addBuntToConstructor = (
  bun: TIngredient,
): IAddBuntToConstructor => ({
  type: constructorActions.ADD_BUN_TO_CONSTRUCTOR,
  bun,
});

export const getIngredientsFailed = (err: any): IGetIngredientsFailed => ({
  type: ingredientsActions.GET_INGREDIENTS_FAILED,
  err,
});
