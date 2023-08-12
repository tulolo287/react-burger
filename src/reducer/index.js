export const actions = {
   CALCULATE_TOTAL_CART: "CALCULATE_TOTAL_CART",
   ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
   ADD_ITEMS_TO_CART: "ADD_ITEMS_TO_CART",
   ADD_BUN_TO_CART: "ADD_BUN_TO_CART",
   SET_DATA_FROM_SERVER: "SET_DATA_FROM_SERVER",
   GET_BUNS: "GET_BUNS",
   SET_BUN: "SET_BUN",
   SET_INGREDIENTS: "SET_INGREDIENTS",
   ADD_INGREDIENT: "ADD_INGREDIENT",
   POST_ORDER: "POST_ORDER",
   SET_LOADING: "SET_LOADING",
};

export const initialState = {
   cart: [],
   data: [],
   buns: [],
   bun: {},
   ingredients: [],
   order: {},
   totalCartPrice: 0,
   loading: true,
};

export const reducer = (state, action) => {
   switch (action.type) {
      case actions.ADD_ITEMS_TO_CART: {
         const newCart = action.payload.map((item) => {
            return { ...item, qty: 1 };
         });
         return { ...state, cart: newCart };
      }
      case actions.SET_DATA_FROM_SERVER:
         return { ...state, data: action.payload };
      case actions.GET_BUNS:
         const buns = state.data.filter((item) => item.type === "bun");
         return { ...state, buns };
      case actions.SET_BUN:
         return { ...state, bun: { ...action.payload, qty: 1 } };
      case actions.SET_INGREDIENTS:
         const ingredients = state.data.filter((item) => item.type !== "bun");
         return { ...state, ingredients: ingredients };
      case actions.ADD_INGREDIENT:
         return { ...state, ingredients: [...state.ingredients, action.payload] };
      case actions.CALCULATE_TOTAL_CART:
         const newTotalPrice = state.cart.reduce(
            (val, acc) => (val += acc.qty * acc.price),
            0
         );
         return { ...state, totalCartPrice: newTotalPrice };
      case actions.ADD_ITEM_TO_CART:
         if (state.cart.find((item) => item._id === action.payload._id) == null) {
            return {
               ...state,
               cart: [...state.cart, { ...action.payload, qty: 1 }],
            };
         } else {
            const newCart = state.cart.map((item) => {
               if (item._id === action.payload._id) {
                  return { ...item, qty: ++item.qty };
               }
               return item;
            });
            return { ...state, cart: newCart };
         }
      case actions.ADD_BUN_TO_CART:
         const removedBun = state.cart.filter((item) => item.type !== "bun");
         return { ...state, cart: [...removedBun, { ...action.payload, qty: 2 }] };
      case actions.POST_ORDER:
         return { ...state, order: action.payload };
      case actions.SET_LOADING:
         return { ...state, loading: action.payload };
      default:
         return state;
   }
};