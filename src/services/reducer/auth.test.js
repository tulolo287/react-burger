import { authActions } from '../constants/auth'
import { authReducer, initialState } from './auth'

const testUser = {
   email: 'test'
}

describe('auth reducer', () => {
   it('should return initial state', () => {
      expect(authReducer(undefined, {})).toEqual(
         initialState
      )
   })
   it('should handle GET_USER_FETCHING', () => {
      expect(authReducer(initialState, { type: authActions.GET_USER_FETCHING })).toEqual(
         {
            ...initialState, isLoading: true,
         }
      )
   })
   it('should handle LOGIN_SUCCESS', () => {
      expect(authReducer(initialState, { type: authActions.LOGIN_SUCCESS, user: testUser })).toEqual(
         {
            ...initialState, user: testUser,
            isAuth: true,
         }
      )
   })
   it('should handle LOGIN_FAILED', () => {
      expect(authReducer(initialState, { type: authActions.LOGIN_FAILED })).toEqual(
         {
            ...initialState
         }
      )
   })
   it('should handle REFRESH_TOKEN_SUCCESS', () => {
      expect(authReducer(initialState, { type: authActions.REFRESH_TOKEN_SUCCESS })).toEqual(
         {
            ...initialState, isAuth: true,
         }
      )
   })
   it('should handle REFRESH_TOKEN_FAILED', () => {
      expect(authReducer(initialState, { type: authActions.REFRESH_TOKEN_FAILED })).toEqual(
         {
            ...initialState
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
            isForgotPassword: false,
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
      expect(authReducer({}, { type: authActions.GET_USER_SUCCESS, user: testUser })).toEqual(
         {
            user: testUser,
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
      expect(authReducer({}, { type: authActions.UPDATE_USER_SUCCESS, user: testUser })).toEqual(
         {
            user: testUser,
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
      expect(authReducer(initialState, { type: authActions.REGISTER_SUCCESS, user: testUser })).toEqual(
         {
            ...initialState,
            user: testUser,
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