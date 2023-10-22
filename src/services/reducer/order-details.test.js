import { orderActions } from "../constants/order-details";
import { initialState, orderDetailsReducer } from "./order-details";


const testOrder = {
   number: 1,
   ingredients: []
}

describe('order details redcer', () => {
   it('should return initial state', () => {
      expect(orderDetailsReducer(undefined, {})).toEqual(
         initialState
      )
   })

   it('should handle POST_ORDER_SUCCESS', () => {
      expect(orderDetailsReducer(initialState, { type: orderActions.POST_ORDER_SUCCESS, order: testOrder })).toEqual(
         {
            ...initialState, orderDetails: testOrder,
         }
      )
   })
   it('should handle SET_ORDER_FEED', () => {
      expect(orderDetailsReducer(initialState, { type: orderActions.SET_ORDER_FEED, payload: { orders: [testOrder] } })).toEqual(
         initialState
      )
   })
   it('should handle POST_ORDER_FAILED', () => {
      expect(orderDetailsReducer(initialState, { type: orderActions.POST_ORDER_FAILED, err: { name: 'test' } })).toEqual(
         {
            ...initialState, postOrderError: { name: 'test' },
         }
      )
   })
   it('should handle POST_ORDER_FETCHING', () => {
      expect(orderDetailsReducer(initialState, { type: orderActions.POST_ORDER_FETCHING })).toEqual(
         {
            ...initialState, isOrderFetching: true
         }
      )
   })

})
