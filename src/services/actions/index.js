import { constructorActions } from "./constructor";
import { ingredientDetailsActions } from "./ingredient-details";
import { ingredientsActions } from "./ingredients";
import { orderActions } from "./order-details";

export const actions = {
  ...ingredientsActions,
  ...constructorActions,
  ...orderActions,
  ...ingredientDetailsActions,
};
