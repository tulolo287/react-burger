
export const actions = {
   CALCULATE_TOTAL_ORDER: "CALCULATE_TOTAL_ORDER",
   CLEAR_ORDER: "CLEAR_ORDER",
   SET_ORDER_DETAIL: "SET_ORDER_DETAIL",
};

export const initialState = {
   totalCartPrice: 0,
   orderDetail: {},
};

export const order = (state = initialState, action) => {
   switch (action.type) {
      case actions.CALCULATE_TOTAL_ORDER:
         const newTotalPrice = state.constructor.burgerIngredients.reduce(
            (val, acc) => (val += acc.qty * acc.price),
            0
         );
         return { ...state, totalCartPrice: newTotalPrice };
      case actions.SET_ORDER_DETAIL:
         return { ...state, orderDetail: action.payload };
      case actions.CLEAR_ORDER:
         return { ...state, burgerIngredients: [], order: [] };
      default:
         return state;
   }
};


