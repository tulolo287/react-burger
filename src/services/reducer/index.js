export const actions = {
   CALCULATE_TOTAL_ORDER: "CALCULATE_TOTAL_ORDER",
   ADD_ITEM_TO_ORDER: "ADD_ITEM_TO_ORDER",
   ADD_ITEMS_TO_ORDER: "ADD_ITEMS_TO_ORDER",
   ADD_BUN_TO_ORDER: "ADD_BUN_TO_ORDER",
   CLEAR_ORDER: "CLEAR_ORDER",
   GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS",
   GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED",
   GET_BUNS: "GET_BUNS",
   SET_BUN: "SET_BUN",
   SET_INGREDIENTS: "SET_INGREDIENTS",
   ADD_INGREDIENT_TO_BURGER: "ADD_INGREDIENT_TO_BURGER",
   POST_ORDER: "POST_ORDER",
   SET_LOADING: "SET_LOADING",
};

export const initialState = {
   order: [],
   data: [],
   buns: [],
   bun: {},
   ingredients: [],
   orderNumber: {},
   totalCartPrice: 0,
   isLoading: true,
   fetchError: false,
};

export const reducer = (state, action) => {
   switch (action.type) {
      case actions.ADD_ITEMS_TO_ORDER: {
         const newOrder = action.payload.map((item) => {
            return { ...item, qty: 1 };
         });
         return { ...state, order: newOrder };
      }
      case actions.GET_INGREDIENTS_SUCCESS:
         return { ...state, data: action.payload };
      case actions.GET_INGREDIENTS_FAILED:
         return { ...state, fetchError: action.payload }
      case actions.GET_BUNS:
         const buns = state.data.filter((item) => item.type === "bun");
         return { ...state, buns };
      case actions.SET_BUN:
         return { ...state, bun: action.payload };
      case actions.SET_INGREDIENTS:
         const ingredients = state.data.filter((item) => item.type !== "bun");
         return { ...state, ingredients: ingredients };
      case actions.ADD_INGREDIENT_TO_BURGER:
         return { ...state, ingredients: [...state.ingredients, action.payload] };
      case actions.CALCULATE_TOTAL_ORDER:
         const newTotalPrice = state.order.reduce(
            (val, acc) => (val += acc.qty * acc.price),
            0
         );
         return { ...state, totalCartPrice: newTotalPrice };
      case actions.ADD_ITEM_TO_ORDER:
         if (state.order.find((item) => item._id === action.payload._id) == null) {
            return {
               ...state,
               order: [...state.order, { ...action.payload, qty: 1 }],
            };
         } else {
            const newOrder = state.order.map((item) => {
               if (item._id === action.payload._id) {
                  return { ...item, qty: item.qty + 1 };
               }
               return item;
            });
            return { ...state, order: newOrder };
         }
      case actions.ADD_BUN_TO_ORDER:
         const removedBun = state.order.filter((item) => item.type !== "bun");
         return { ...state, order: [...removedBun, { ...action.payload, qty: 2 }] };
      case actions.POST_ORDER:
         return { ...state, orderNumber: action.payload };
      case actions.CLEAR_ORDER:
         return { ...state, ingredients: [], order: [] };
      case actions.SET_LOADING:
         return { ...state, isLoading: action.payload };
      default:
         return state;
   }
};