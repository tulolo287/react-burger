
export const actions = {
   SET_INGREDIENT_DETAILS: "SET_INGREDIENT_DETAILS",
};

export const initialState = {
   ingredientDetails: {},
};

export const ingredientDetailsReducer = (state = initialState, action) => {
   switch (action.type) {
      case actions.SET_INGREDIENT_DETAILS:
         return { ...state, ingredientDetails: action.payload };
      default:
         return state;
   }
};


