import { wsActions } from "../constants/wsConsts";
import { initialState, wsReducer } from "./ws";

const testMessage = {
   number: 1,
   orders: [],
   total: 1,
}

describe('order details redcer', () => {
   it('should return initial state', () => {
      expect(wsReducer(undefined, {})).toEqual(
         initialState
      )
   })
   it('should handle WS_CONNECTION_SUCCESS', () => {
      expect(wsReducer(initialState, { type: wsActions.WS_CONNECTION_SUCCESS })).toEqual(
         {
            ...initialState, error: undefined,
            fetchMessages: false,
            wsConnected: true,
         }
      )
   })
   it('should handle WS_CONNECTION_ERROR', () => {
      expect(wsReducer(initialState, { type: wsActions.WS_CONNECTION_ERROR, payload: { name: 'test' } })).toEqual(
         {
            ...initialState, error: { name: 'test' },
            fetchMessages: false,
            wsConnected: false,
         }
      )
   })
   it('should handle WS_CONNECTION_CLOSED', () => {
      expect(wsReducer(initialState, { type: wsActions.WS_CONNECTION_CLOSED })).toEqual(
         {
            ...initialState, error: undefined,
            fetchMessages: false,
            wsConnected: false,
         }
      )
   })
   it('should handle WS_CONNECTION_CLOSE', () => {
      expect(wsReducer(initialState, { type: wsActions.WS_CONNECTION_CLOSE })).toEqual(
         {
            ...initialState, error: undefined,
            fetchMessages: false,
            wsConnected: false,
         }
      )
   })
   it('should handle WS_GET_MESSAGE_SUCCESS', () => {
      expect(wsReducer(initialState, { type: wsActions.WS_GET_MESSAGE_SUCCESS, payload: testMessage })).toEqual(
         {
            ...initialState, fetchMessages: false,
            error: undefined,
            messages: testMessage,
         }
      )
   })
   it('should handle WS_GET_MESSAGE_FAILED', () => {
      expect(wsReducer(initialState, { type: wsActions.WS_GET_MESSAGE_FAILED })).toEqual(
         {
            ...initialState, fetchMessages: false,
            error: undefined,
         }
      )
   })
})
