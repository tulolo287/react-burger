import { deleteCookie, setCookie } from "../../utils/api";
import { TUser } from "../../utils/types";
import { TAuthActions } from "../actions/auth";
import { authActions } from "../constants/auth";

type TInitialState = {
  user: TUser | null,
  isAuth: boolean,
  isLoading: boolean,
  isPasswordReset: boolean,
  isForgotPassword: boolean,
}

export const initialState: TInitialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isPasswordReset: false,
  isForgotPassword: false,
};

export const authReducer = (state = initialState, action: TAuthActions): TInitialState => {
  switch (action.type) {
    case authActions.GET_USER_FETCHING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuth: true,
        isLoading: false,
      };
    case authActions.LOGIN_FAILED:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
      };
    case authActions.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
      };
    case authActions.REFRESH_TOKEN_FAILED:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
      };
    case authActions.RESET_PASSWORD_SUCCESS:
      setCookie("token", JSON.stringify(action.response.accessToken), {});
      return {
        ...state,
        isAuth: true,
        isLoading: false,
      };
    case authActions.RESET_PASSWORD_FAILED:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
      };
    case authActions.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isForgotPassword: false,
      };
    case authActions.FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        isForgotPassword: false,
      };
    case authActions.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuth: true,
        isLoading: false,
      };
    case authActions.GET_USER_FAILED: {
      return {
        ...state,
        isAuth: false,
        user: null,
        isLoading: false,
      };
    }
    case authActions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuth: true,
        isLoading: false,
      };
    case authActions.UPDATE_USER_FAILED: {
      return {
        ...state,
        isAuth: false,
        isLoading: false,
      };
    }
    case authActions.REGISTER_SUCCESS:
      setCookie("token", JSON.stringify(action.response.accessToken), {});
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.response.refreshToken)
      );
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.response.accessToken)
      );
      return {
        ...state,
        user: action.response.user,
        isAuth: true,
      };
    case authActions.REGISTER_FAILED:
      return {
        ...state,
        isAuth: false,
      };
    case authActions.LOGOUT_SUCCESS:
      localStorage.removeItem("accessToken");
      deleteCookie("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessTokenExp");
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
