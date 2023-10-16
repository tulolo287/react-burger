import { wsReducer } from "./ws";
import { wsActions } from "../constants/wsConsts";

describe('order details redcer', () => {
      it('should return initial state', () => {
      expect(wsReducer(undefined, {})).toEqual(
         {
             wsConnected: false,
  messages: null,
  fetchMessages: false,
         }
      )
   })
 it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer({}, { type: wsActions.WS_CONNECTION_SUCCESS})).toEqual(
       {
         error: undefined,
        fetchMessages: true,
        wsConnected: true,
       }
    )
 })
 it('should handle WS_CONNECTION_ERROR', () => {
    expect(wsReducer({}, { type: wsActions.WS_CONNECTION_ERROR, payload:{name: 'test'}})).toEqual(
       {
         error: {name: 'test'},
        fetchMessages: false,
        wsConnected: false,
       }
    )
 })
 it('should handle WS_CONNECTION_CLOSED', () => {
    expect(wsReducer({}, { type: wsActions.WS_CONNECTION_CLOSED})).toEqual(
       {
        error: undefined,
        fetchMessages: false,
        wsConnected: false,
       }
    )
 })
 it('should handle WS_CONNECTION_CLOSE', () => {
    expect(wsReducer({}, { type: wsActions.WS_CONNECTION_CLOSE})).toEqual(
       {
        error: undefined,
        fetchMessages: false,
        wsConnected: false,
       }
    )
 })
 it('should handle WS_GET_MESSAGE_SUCCESS', () => {
    expect(wsReducer({}, { type: wsActions.WS_GET_MESSAGE_SUCCESS, payload:{name: 'test'}})).toEqual(
       {
         fetchMessages: false,
         error: undefined,
         messages: {name: 'test'},
       }
    )
 })
 it('should handle WS_GET_MESSAGE_FAILED', () => {
    expect(wsReducer({}, { type: wsActions.WS_GET_MESSAGE_FAILED})).toEqual(
       {
        fetchMessages: false,
        error: undefined,
       }
    )
 })
 })
