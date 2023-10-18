import { TIngredient } from "../../utils/types";
import { TConstructorActions } from "../actions/constructor";

import { actions } from "../constants";

type TInitialState = {
  constructorIngredients: TIngredient[];
  bun: TIngredient | undefined;
  orderDetails: any;
};

export const initialState: TInitialState = {
  constructorIngredients: [],
  bun: undefined,
  orderDetails: null,
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions
): TInitialState => {
  switch (action.type) {
    case actions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      const newBurgerIngredients = state.constructorIngredients.filter(
        (item) => item.key !== action.ingredient.key
      );
      return {
        ...state,
        constructorIngredients: newBurgerIngredients,
      };
    }
    case actions.CHANGE_CONSTRUCTOR_INGREDIENT: {
      const sortCards = state.constructorIngredients.filter(
        (item, idx) => idx !== action.ingredient.dragIndex
      );
      sortCards.splice(
        action.ingredient.hoverIndex,
        0,
        state.constructorIngredients[action.ingredient.dragIndex]
      );
      return { ...state, constructorIngredients: sortCards };
    }
    case actions.ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          { ...action.ingredient, qty: 1 },
        ],
      };
    }
    case actions.ADD_BUN_TO_CONSTRUCTOR: {
      return {
        ...state,
        bun: action.bun,
      };
    }
    case actions.CLEAR_ORDER:
      return { ...state, constructorIngredients: [] };
    default:
      return state;
  }
};
