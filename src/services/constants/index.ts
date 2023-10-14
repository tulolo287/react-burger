import { authActions } from "./auth";
import { constructorActions } from "./constructor";
import { ingredientDetailsActions } from "./ingredient-details";
import { ingredientsActions } from "./ingredients";
import { orderActions } from "./order-details";
import { wsActions } from "./wsConsts";

export const actions = {
  ...wsActions,
  ...ingredientsActions,
  ...constructorActions,
  ...orderActions,
  ...ingredientDetailsActions,
  ...authActions,
};
