import { TAuthActions } from "./auth";
import { TConstructorActions } from "./constructor";
import { TIngredientsActions } from "./ingredients";
import { TOrderDetailsActions } from "./order-details";
import { TWSActions } from "./wsActions";

export type AppActions =
  | TConstructorActions
  | TAuthActions
  | TIngredientsActions
  | TOrderDetailsActions
  | TWSActions;

