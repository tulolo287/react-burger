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
  readonly type: typeof constructorActions.CHANGE_CONSTRUCTOR_INGREDIENT;
  readonly ingredient: { dragIndex: number; hoverIndex: number };
}
export interface IRemoveIngredientConstructor {
  readonly type: typeof constructorActions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly ingredient: TIngredient;
}
export interface IInitConstructor {
  readonly type: typeof constructorActions.INIT_CONSTRUCTOR;
  readonly bun: TIngredient;
}
export interface ISetOrderDetails {
  readonly type: typeof constructorActions.SET_ORDER_DETAILS;
  readonly orderDetails: any;
}
export interface IClearOrder {
  readonly type: typeof constructorActions.CLEAR_ORDER;
}

export type TConstructorActions =
  | IAddIngredientToConstructor
  | ISetOrderDetails
  | IClearOrder
  | IAddBuntToConstructor
  | IChangeConstructorIngredient
  | IRemoveIngredientConstructor;

export const removeIngredientConstructor = (
  ingredient: TIngredient,
): IRemoveIngredientConstructor => ({
  type: constructorActions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  ingredient,
});

export const changeConstructorIngredient = (ingredient: {
  dragIndex: number;
  hoverIndex: number;
}): IChangeConstructorIngredient => ({
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

export const initConstructor = (bun: TIngredient): IAddBuntToConstructor => ({
  type: constructorActions.ADD_BUN_TO_CONSTRUCTOR,
  bun,
});

export const setOrderDetails = (orderDetails: any): ISetOrderDetails => ({
  type: constructorActions.SET_ORDER_DETAILS,
  orderDetails,
});

export const clearOrder = (): IClearOrder => ({
  type: constructorActions.CLEAR_ORDER,
});
