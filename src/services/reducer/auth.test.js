import { authActions } from '../constants/auth'
import { authReducer, initialState } from './auth'

describe('auth reducer', () => {
   it('should return initial state', () => {
      expect(authReducer(undefined, {})).toEqual(
        initialState
      )
   })
   it('should handle GET_USER_FETCHING', () => {
      expect(authReducer({}, { type: authActions.GET_USER_FETCHING })).toEqual(
         {
            isLoading: true,
         }
      )
   })
   it('should handle LOGIN_SUCCESS', () => {
      expect(authReducer({}, { type: authActions.LOGIN_SUCCESS, user: { email: '123' } })).toEqual(
         {
            user: { email: '123' },
            isAuth: true,
            isLoading: false,
         }
      )
   })
   it('should handle LOGIN_FAILED', () => {
      expect(authReducer({}, { type: authActions.LOGIN_FAILED })).toEqual(
         {
            isAuth: false,
            isLoading: false,
         }
      )
   })
   it('should handle REFRESH_TOKEN_SUCCESS', () => {
      expect(authReducer({}, { type: authActions.REFRESH_TOKEN_SUCCESS })).toEqual(
         {
            isAuth: true,
            isLoading: false,
         }
      )
   })
   it('should handle REFRESH_TOKEN_FAILED', () => {
      expect(authReducer({}, { type: authActions.REFRESH_TOKEN_FAILED })).toEqual(
         {
            isAuth: false,
            isLoading: false,
         }
      )
   })
   it('should handle RESET_PASSWORD_SUCCESS', () => {
      expect(authReducer({}, { type: authActions.RESET_PASSWORD_SUCCESS, response: 'lll' })).toEqual(
         {
            isAuth: true,
            isLoading: false,
         }
      )
   })


   it('should handle RESET_PASSWORD_FAILED', () => {
      expect(authReducer({}, { type: authActions.RESET_PASSWORD_FAILED })).toEqual(
         {
            isAuth: false,
            isLoading: false,
         }
      )
   })
   it('should handle FORGOT_PASSWORD_SUCCESS', () => {
      expect(authReducer({}, { type: authActions.FORGOT_PASSWORD_SUCCESS, response: '123' })).toEqual(
         {
            isForgotPassword: '123',
         }
      )
   })
   it('should handle FORGOT_PASSWORD_FAILED', () => {
      expect(authReducer({}, { type: authActions.FORGOT_PASSWORD_FAILED })).toEqual(
         {
            isForgotPassword: false,
         }
      )
   })
   it('should handle GET_USER_SUCCESS', () => {
      expect(authReducer({}, { type: authActions.GET_USER_SUCCESS, user: { email: '123' } })).toEqual(
         {
            user: { email: '123' },
            isAuth: true,
            isLoading: false,
         }
      )
   })
   it('should handle GET_USER_FAILED', () => {
      expect(authReducer({}, { type: authActions.GET_USER_FAILED })).toEqual(
         {
            isAuth: false,
            user: null,
            isLoading: false,
         }
      )
   })
   it('should handle UPDATE_USER_SUCCESS', () => {
      expect(authReducer({}, { type: authActions.UPDATE_USER_SUCCESS, user: { email: '123' } })).toEqual(
         {
            user: { email: '123' },
            isAuth: true,
            isLoading: false,
         }
      )
   })
   it('should handle UPDATE_USER_FAILED', () => {
      expect(authReducer({}, { type: authActions.UPDATE_USER_FAILED })).toEqual(
         {
            isAuth: false,
            isLoading: false,
         }
      )
   })
   it('should handle REGISTER_SUCCESS', () => {
      expect(authReducer({}, { type: authActions.REGISTER_SUCCESS, response: { email: '123' } })).toEqual(
         {
            user: { email: '123' },
            isAuth: true,
         }
      )
   })
   it('should handle REGISTER_FAILED', () => {
      expect(authReducer({}, { type: authActions.REGISTER_FAILED })).toEqual(
         {
            isAuth: false,
         }
      )
   })
   it('should handle LOGOUT_SUCCESS', () => {
      expect(authReducer({}, { type: authActions.LOGOUT_SUCCESS })).toEqual(
         initialState
      )
   })




})