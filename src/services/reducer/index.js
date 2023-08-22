import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderDetailsReducer } from "./order-details";

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  ingredientDetailsReducer,
  orderDetailsReducer,
});
