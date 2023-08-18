import { actions } from "../actions";

export const initialState = {
  data: null,
  allIngredients: [],
  ingredientDetails: {},
  isLoading: true,
  fetchError: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        fetchError: false,
      };
    case actions.GET_INGREDIENTS_FAILED:
      return { ...state, fetchError: action.payload };
    case actions.SET_SORTED_INGREDIENTS:
      return { ...state, allIngredients: action.payload };
    case actions.SET_INGREDIENT_DETAILS:
      return { ...state, ingredientDetails: action.payload };
    case actions.DECREASE_INGREDIET_QTY: {
      const newAllIngredients = state.allIngredients.map((item) =>
        item._id === action.payload._id
          ? { ...item, qty: item.qty <= 1 ? null : item.qty - 1 }
          : item,
      );
      return {
        ...state,
        allIngredients: newAllIngredients,
      };
    }
    case actions.INCREASE_INGREDIET_QTY: {
      let newAllIngredients = state.allIngredients.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, qty: item.qty ? item.qty + 1 : action.payload.qty };
        }
        return item;
      });
      return { ...state, allIngredients: newAllIngredients };
    }
    case actions.DATA_FETCHING:
      return { ...state, isLoading: true, fetchError: false };

    default:
      return state;
  }
};
