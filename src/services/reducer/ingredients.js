import { actions } from "../actions";

export const initialState = {
  ingredients: null,
  sortedIngredients: [],
  isLoading: true,
  fetchError: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        isLoading: false,
        fetchError: false,
      };
    case actions.GET_INGREDIENTS_FAILED:
      return { ...state, fetchError: action.payload };
    case actions.SET_SORTED_INGREDIENTS:
      return { ...state, sortedIngredients: action.payload };
    case actions.DECREASE_INGREDIET_QTY: {
      const newSortedIngredients = state.sortedIngredients.map((item) =>
        item._id === action.payload._id
          ? { ...item, qty: item.qty <= 1 ? null : item.qty - 1 }
          : item,
      );
      return {
        ...state,
        sortedIngredients: newSortedIngredients,
      };
    }
    case actions.INCREASE_INGREDIET_QTY: {
      let newSortedIngredients = state.sortedIngredients.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, qty: item.qty ? item.qty + 1 : 1};
        }
        return item;
      });
      return { ...state, sortedIngredients: newSortedIngredients };
    }
    case actions.INGREDIENTS_FETCHING:
      return { ...state, isLoading: true, fetchError: false };

    default:
      return state;
  }
};
