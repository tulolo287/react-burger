
export const actions = {
   GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS",
   GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED",
   SET_SORTED_INGREDIENTS: "SET_All_INGREDIENTS",
   SET_INGREDIENT_DETAILS: "SET_INGREDIENT_DETAILS",
   INCREASE_INGREDIET_QTY: "INCREASE_INGREDIET_QTY",
   DECREASE_INGREDIET_QTY: "DECREASE_INGREDIET_QTY",
   SET_LOADING: "SET_LOADING",
};

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
         return { ...state, data: action.payload };
      case actions.GET_INGREDIENTS_FAILED:
         return { ...state, fetchError: action.payload }
      case actions.SET_SORTED_INGREDIENTS:
         return { ...state, allIngredients: action.payload };
      case actions.SET_INGREDIENT_DETAILS:
         return { ...state, ingredientDetails: action.payload };
      case actions.DECREASE_INGREDIET_QTY: {
         const newAllIngredients = state.allIngredients.map(item => item._id === action.payload._id ? { ...item, qty: item.qty <= 1 ? null : item.qty - 1 } : item)
         return {
            ...state, allIngredients: newAllIngredients
         }
      }
      case actions.INCREASE_INGREDIET_QTY: {
         let newAllIngredients = state.allIngredients.map((item) => {
            if (item._id === action.payload._id) {
               return { ...item, qty: item.qty ? item.qty + 1 : action.payload.qty };
            }
            return item;
         });
         return { ...state, allIngredients: newAllIngredients }
      }
      case actions.SET_LOADING:
         return { ...state, isLoading: action.payload };

      default:
         return state;
   }
};


