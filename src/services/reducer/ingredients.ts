import { TIngredient } from "../../utils/types";
import { TIngredientsActions } from "../actions/ingredients";
import { ingredientsActions } from "../constants/ingredients";

type TInitialState = {
  ingredients: TIngredient[] | null;
  sortedIngredients: TIngredient[] | undefined;
  isLoading: boolean;
  fetchError: boolean;
};
export const initialState: TInitialState = {
  ingredients: null,
  sortedIngredients: undefined,
  isLoading: true,
  fetchError: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions,
): TInitialState => {
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
      const newSortedIngredients = state.sortedIngredients?.map((item) =>
        item._id === action.item._id
          ? {
              ...item,
              qty:
                item.qty === 1
                  ? undefined
                  : typeof item.qty === "number"
                  ? item.qty - 1
                  : undefined,
            }
          : item,
      );
      return {
        ...state,
        sortedIngredients: newSortedIngredients,
      };
    }
    case ingredientsActions.INCREASE_INGREDIENT_QTY: {
      let newSortedIngredients = state.sortedIngredients?.map((item) => {
        if (item._id === action.ingredient._id) {
          return { ...item, qty: item.qty ? item.qty + 1 : 1 };
        }
        return item;
      });
      return { ...state, sortedIngredients: newSortedIngredients };
    }
    case ingredientsActions.INCREASE_BUN_QTY: {
      let newSortedIngredients = state.sortedIngredients?.map((item) => {
        if (item._id === action.ingredient._id) {
          return { ...item, qty: 2 };
        }
        return { ...item, qty: undefined };
      });
      return { ...state, sortedIngredients: newSortedIngredients };
    }
    case ingredientsActions.INGREDIENTS_FETCHING:
      return { ...state, isLoading: true, fetchError: false };

    default:
      return state;
  }
};
