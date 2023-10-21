import { orderActions } from "../constants/order-details";
import { initialState, orderDetailsReducer } from "./order-details";

describe('order details redcer', () => {
   it('should return initial state', () => {
      expect(orderDetailsReducer(undefined, {})).toEqual(
         initialState
      )
   })

   it('should handle POST_ORDER_SUCCESS', () => {
      expect(orderDetailsReducer({}, { type: orderActions.POST_ORDER_SUCCESS, order: { name: 'test' } })).toEqual(
         {
            ...initialState, orderDetails: { name: 'test' },
         }
      )
   })
   it('should handle SET_ORDER_FEED', () => {
      expect(orderDetailsReducer({}, { type: orderActions.SET_ORDER_FEED, payload: { orders: [{ name: 'test', id: 'test' }] } })).toEqual(
         initialState
      )
   })
   it('should handle POST_ORDER_FAILED', () => {
      expect(orderDetailsReducer({}, { type: orderActions.POST_ORDER_FAILED, err: { name: 'test' } })).toEqual(
         {
            ...initialState, postOrderError: { name: 'test' },
         }
      )
   })
   it('should handle POST_ORDER_FETCHING', () => {
      expect(orderDetailsReducer({}, { type: orderActions.POST_ORDER_FETCHING })).toEqual(
         {
            ...initialState, isOrderFetching: true
         }
      )
   })

})
