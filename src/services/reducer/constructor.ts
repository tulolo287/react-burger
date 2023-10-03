import { TIngredient } from "../../utils/types";
import { TConstructorActions } from "../actions/constructor";

import { actions } from "../constants";


export const initialState = {
  constructorIngredients: [
    {
      _id: "60666c42cc7b410027a1a9b1",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
      qty: 2,
      key: ""
    },
  ],
};

export const constructorReducer = (state = initialState, action: TConstructorActions) => {
  switch (action.type) {
  
    case actions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      const newBurgerIngredients = state.constructorIngredients.filter(
        (item) => item.key !== action.ingredient.key,
      );
      return {
        ...state,
        constructorIngredients: newBurgerIngredients,
      };
    }
    case actions.CHANGE_CONSTRUCTOR_INGREDIENT: {
      const sortCards = state.constructorIngredients.filter(
        (item, idx) => idx !== action.ingredient.dragIndex,
      );
      sortCards.splice(
        action.ingredient.hoverIndex,
        0,
        state.constructorIngredients[action.ingredient.dragIndex],
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
        ...state.constructorIngredients.splice(0, 1, {
          ...action.bun,
          qty: 2,
          key: ""
        }),
      };
    }
    case actions.SET_ORDER_DETAILS:
      return { ...state, orderDetails: action.orderDetails };
    case actions.CLEAR_ORDER:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
