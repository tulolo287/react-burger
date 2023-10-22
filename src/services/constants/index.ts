import { authActions } from "./auth";
import { constructorActions } from "./constructor";
import { ingredientsActions } from "./ingredients";
import { orderActions } from "./order-details";
import { wsActions } from "./wsConsts";

export const actions = {
  ...wsActions,
  ...ingredientsActions,
  ...constructorActions,
  ...orderActions,
  ...authActions,
};
