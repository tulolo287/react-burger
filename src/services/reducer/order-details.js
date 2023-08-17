
export const actions = {
   SET_ORDER_DETAILS: "SET_ORDER_DETAILS",
};

export const initialState = {
   orderDetails: {},
};

export const orderDetailsReducer = (state = initialState, action) => {
   switch (action.type) {
      case actions.SET_ORDER_DETAILS:
         return { ...state, orderDetails: action.payload };
      default:
         return state;
   }
};


