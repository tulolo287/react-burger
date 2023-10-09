import { TIngredientDetailsActions } from "../actions/ingredient-details";
import { ingredientDetailsActions } from "../constants/ingredient-details";

export const initialState = {
  ingredientDetails: {},
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: TIngredientDetailsActions,
) => {
  switch (action.type) {
    case ingredientDetailsActions.SET_INGREDIENT_DETAILS:
      return { ...state, ingredientDetails: action.ingredientDetails };
    default:
      return state;
  }
};
