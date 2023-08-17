import { combineReducers } from 'redux'
import { ingredients } from './ingredients';
import { constructor } from './constructor';
import { order } from './order';

export const actions = {
   CALCULATE_TOTAL_ORDER: "CALCULATE_TOTAL_ORDER",
   ADD_INGREDIENT_TO_BURGER: "ADD_INGREDIENT_TO_BURGER",
   ADD_ITEMS_TO_ORDER: "ADD_ITEMS_TO_ORDER",
   ADD_BUN_TO_ORDER: "ADD_BUN_TO_ORDER",
   CLEAR_ORDER: "CLEAR_ORDER",
   GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS",
   GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED",
   GET_BUNS: "GET_BUNS",
   SET_BUN: "SET_BUN",
   SET_SORTED_INGREDIENTS: "SET_All_INGREDIENTS",
   ADD_INGREDIENT_TO_BURGER: "ADD_INGREDIENT_TO_BURGER",
   ADD_BUN_TO_BURGER: "ADD_BUN_TO_BURGER",
   REMOVE_INGREDIENT_FROM_BURGER: "REMOVE_INGREDIENT_FROM_BURGER",
   CHANGE_BURGER_INGREDIENT: "CHANGE_BURGER_INGREDIENT",
   INCREASE_INGREDIET_QTY: "INCREASE_INGREDIET_QTY",
   DECREASE_INGREDIET_QTY: "DECREASE_INGREDIET_QTY",
   SET_LOADING: "SET_LOADING",
   CALCULATE_TOTAL_ORDER: "CALCULATE_TOTAL_ORDER",
   SET_INGREDIENT_DETAIL: "SET_INGREDIENT_DETAIL",
   SET_ORDER_DETAIL: "SET_ORDER_DETAIL",
};

export const initialState = {
   order: [],
   data: [],
   buns: [],
   bun: {},
   allIngredients: [],
   burgerIngredients: [],
   totalCartPrice: 0,
   ingredientDetail: {},
   orderDetail: {},
   isLoading: true,
   fetchError: false,
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actions.ADD_ITEMS_TO_ORDER: {
         const newOrder = action.payload.map((item) => {
            return { ...item, qty: 1 };
         });
         return { ...state, order: newOrder };
      }
      case actions.GET_INGREDIENTS_SUCCESS:
         return { ...state, data: action.payload };
      case actions.GET_INGREDIENTS_FAILED:
         return { ...state, fetchError: action.payload }
      case actions.GET_BUNS:
         const buns = state.data.filter((item) => item.type === "bun");
         return { ...state, buns }
      case actions.SET_BUN:
         return { ...state, bun: action.payload };
      case actions.SET_SORTED_INGREDIENTS:
         return { ...state, allIngredients: action.payload };

      case actions.REMOVE_INGREDIENT_FROM_BURGER: {
         const newBurgerIngredients = state.burgerIngredients.filter(item => item.key !== action.payload.key)
         const newAllIngredients = state.allIngredients.map(item => item._id === action.payload._id ? { ...item, qty: item.qty <= 1 ? null : item.qty - 1 } : item)
         return {
            ...state, burgerIngredients: newBurgerIngredients, allIngredients: newAllIngredients
         }
      }
      case actions.CHANGE_BURGER_INGREDIENT: {
         const sortCards = state.burgerIngredients.filter((item, idx) => idx !== action.payload.dragIndex);
         sortCards.splice(action.payload.hoverIndex, 0, state.burgerIngredients[action.payload.dragIndex]);
         return { ...state, burgerIngredients: sortCards }
      }
      case actions.CALCULATE_TOTAL_ORDER:
         const newTotalPrice = state.burgerIngredients.reduce(
            (val, acc) => (val += acc.qty * acc.price),
            0
         );
         return { ...state, totalCartPrice: newTotalPrice };

      case actions.ADD_INGREDIENT_TO_BURGER: {
         let newAllIngredients = state.allIngredients.map((item) => {
            if (item._id === action.payload._id) {
               return { ...item, qty: item.qty ? item.qty + 1 : action.payload.qty };
            }
            return item;
         });

         return { ...state, allIngredients: newAllIngredients, burgerIngredients: [...state.burgerIngredients, action.payload] };
      }
      case actions.ADD_BUN_TO_BURGER: {
         const removedBun = state.burgerIngredients.filter((item) => item.type !== "bun");
         return { ...state, burgerIngredients: [...removedBun, { ...action.payload, qty: 2 }] };
      }

      case actions.SET_ORDER_DETAIL:
         return { ...state, orderDetail: action.payload };
      case actions.CLEAR_ORDER:
         return { ...state, burgerIngredients: [], order: [] };
      case actions.SET_LOADING:
         return { ...state, isLoading: action.payload };
      case actions.SET_INGREDIENT_DETAIL:
         return { ...state, ingredientDetail: action.payload };

      default:
         return state;
   }
};

export const rootReducer = combineReducers({
   ingredientsReducer: ingredients,
   constructorReducer: constructor
})
