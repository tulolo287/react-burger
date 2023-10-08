import { State } from "../types";


export const getIngredients = (store: State) => store.ingredientsReducer.ingredients;
export const getSortedIngredients = (store: State) => store.ingredientsReducer.sortedIngredients;
export const getIngredientsLoading = (store: State) => store.ingredientsReducer.isLoading;
