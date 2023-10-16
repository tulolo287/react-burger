import { orderDetailsReducer } from "./order-details";
import { orderActions } from "../constants/order-details";


export const initialState = {
  orderDetails: null,
  isOrderFetching: false,
  postOrderError: false,
  allOrders: null,
};

describe('order details redcer', () => {
      it('should return initial state', () => {
      expect(orderDetailsReducer(undefined, {})).toEqual(
         {
             orderDetails: null,
  isOrderFetching: false,
  postOrderError: false,
  allOrders: null,
         }
      )
   })

   it('should handle POST_ORDER_SUCCESS', () => {
    expect(orderDetailsReducer({}, { type: orderActions.POST_ORDER_SUCCESS, order:{name:'test'} })).toEqual(
       {
        orderDetails: {name:'test'},
        isOrderFetching: false,
        postOrderError: false,
       }
    )
 })
 it('should handle SET_ORDER_FEED', () => {
    expect(orderDetailsReducer({}, { type: orderActions.SET_ORDER_FEED, payload:{ orders:[{name:'test', id: 'test'}] }})).toEqual(
       {
        isOrderFetching: false,
        postOrderError: false,
       }
    )
 })
 it('should handle POST_ORDER_FAILED', () => {
    expect(orderDetailsReducer({}, { type: orderActions.POST_ORDER_FAILED, err:{name: 'test'} })).toEqual(
       {
        postOrderError: {name: 'test'},
        orderDetails: null,
        isOrderFetching: false,
        allOrders: null,
       }
    )
 })
 it('should handle POST_ORDER_FETCHING', () => {
    expect(orderDetailsReducer({}, { type: orderActions.POST_ORDER_FETCHING })).toEqual(
       {
        isOrderFetching: true, postOrderError: false
       }
    )
 })

})
