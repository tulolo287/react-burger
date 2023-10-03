
import { TIngredientsActions } from "../actions/ingredients";
import { ingredientsActions } from "../constants/ingredients";

export const initialState = {
  ingredients: null,
  sortedIngredients: [],
  isLoading: true,
  fetchError: false,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case ingredientsActions.GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients,
        isLoading: false,
        fetchError: false,
      };
    case ingredientsActions.GET_INGREDIENTS_FAILED:
      return { ...state, fetchError: action.err };
    case ingredientsActions.SET_SORTED_INGREDIENTS:
      return { ...state, sortedIngredients: action.ingredients };
    case ingredientsActions.DECREASE_INGREDIENT_QTY: {
      const newSortedIngredients = state.sortedIngredients.map((item) =>
        item._id === action.item._id
          ? { ...item, qty: item.qty <= 1 ? null : item.qty - 1 }
          : item,
      );
      return {
        ...state,
        sortedIngredients: newSortedIngredients,
      };
    }
    case ingredientsActions.INCREASE_INGREDIENT_QTY: {
      let newSortedIngredients = state.sortedIngredients.map((item) => {
        if (item._id === action.ingredient._id) {
          return { ...item, qty: item.qty ? item.qty + 1 : 1 };
        }
        return item;
      });
      return { ...state, sortedIngredients: newSortedIngredients };
    }
    case ingredientsActions.INGREDIENTS_FETCHING:
      return { ...state, isLoading: true, fetchError: false };

    default:
      return state;
  }
};
