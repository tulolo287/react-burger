import { actions } from "../actions";

export const initialState = {
  bun: {},
  constructorIngredients: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_BUN:
      return { ...state, bun: action.payload };
    case actions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      const newBurgerIngredients = state.constructorIngredients.filter(
        (item) => item.key !== action.payload.key,
      );
      return {
        ...state,
        constructorIngredients: newBurgerIngredients,
      };
    }
    case actions.CHANGE_CONSTRUCTOR_INGREDIENT: {
      const sortCards = state.constructorIngredients.filter(
        (item, idx) => idx !== action.payload.dragIndex,
      );
      sortCards.splice(
        action.payload.hoverIndex,
        0,
        state.constructorIngredients[action.payload.dragIndex],
      );
      return { ...state, constructorIngredients: sortCards };
    }
    case actions.ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.payload],
      };
    }
    case actions.ADD_BUN_TO_CONSTRUCTOR: {
      const removedBun = state.constructorIngredients.filter(
        (item) => item.type !== "bun",
      );
      return {
        ...state,
        constructorIngredients: [...removedBun, { ...action.payload, qty: 2 }],
      };
    }
    case actions.SET_ORDER_DETAILS:
      return { ...state, orderDetails: action.payload };
    case actions.CLEAR_ORDER:
      return { ...state, constructorIngredients: [], order: [] };
    default:
      return state;
  }
};
