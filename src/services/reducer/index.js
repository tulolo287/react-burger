import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderDetailsReducer } from './order-details';

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
   SET_INGREDIENT_DETAILS: "SET_INGREDIENT_DETAILS",
   SET_ORDER_DETAILS: "SET_ORDER_DETAILS",
};


export const rootReducer = combineReducers({
   ingredientsReducer,
   constructorReducer,
   ingredientDetailsReducer,
   orderDetailsReducer,
})
