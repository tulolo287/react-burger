import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderDetailsReducer } from "./order-details";
import { authReducer } from "./auth";
import { wsReducer } from "./ws";

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  ingredientDetailsReducer,
  orderDetailsReducer,
  authReducer,
  wsReducer,
});
