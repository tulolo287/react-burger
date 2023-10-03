import { TAuthActions } from "./auth";
import { TConstructorActions } from "./constructor";
import { TIngredientsActions } from "./ingredients";
import { TOrderDetailsActions } from "./order-details";

export type TActions =
  | TConstructorActions
  | TAuthActions
  | TIngredientsActions
  | TOrderDetailsActions;
