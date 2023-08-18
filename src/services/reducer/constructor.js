import { actions } from "../actions";

export const initialState = {
  bun: {},
  burgerIngredients: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_BUN:
      return { ...state, bun: action.payload };
    case actions.REMOVE_INGREDIENT_FROM_BURGER: {
      const newBurgerIngredients = state.burgerIngredients.filter(
        (item) => item.key !== action.payload.key,
      );
      return {
        ...state,
        burgerIngredients: newBurgerIngredients,
      };
    }
    case actions.CHANGE_BURGER_INGREDIENT: {
      const sortCards = state.burgerIngredients.filter(
        (item, idx) => idx !== action.payload.dragIndex,
      );
      sortCards.splice(
        action.payload.hoverIndex,
        0,
        state.burgerIngredients[action.payload.dragIndex],
      );
      return { ...state, burgerIngredients: sortCards };
    }
    case actions.ADD_INGREDIENT_TO_BURGER: {
      return {
        ...state,
        burgerIngredients: [...state.burgerIngredients, action.payload],
      };
    }
    case actions.ADD_BUN_TO_BURGER: {
      const removedBun = state.burgerIngredients.filter(
        (item) => item.type !== "bun",
      );
      return {
        ...state,
        burgerIngredients: [...removedBun, { ...action.payload, qty: 2 }],
      };
    }
    case actions.SET_ORDER_DETAILS:
      return { ...state, orderDetails: action.payload };
    case actions.CLEAR_ORDER:
      return { ...state, burgerIngredients: [], order: [] };
    default:
      return state;
  }
};
