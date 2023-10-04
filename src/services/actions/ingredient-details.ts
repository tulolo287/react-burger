import { ingredientDetailsActions } from "../constants/ingredient-details";

export interface ISetIngredientDetails {
  readonly type: typeof ingredientDetailsActions.SET_INGREDIENT_DETAILS;
  ingredientDetails: any;
};
export type TIngredientDetailsActions = ISetIngredientDetails;
  
export const setIngredientDetails = (ingredientDetails: any): ISetIngredientDetails => ({
  type: ingredientDetailsActions.SET_INGREDIENT_DETAILS,
  ingredientDetails,
});