import { deleteCookie, setCookie } from "../../utils/api";
import { actions } from "../actions";

export const initialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isPasswordReset: false,
  isForgotPassword: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_USER_FETCHING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        isLoading: false,
      };
    case actions.LOGIN_FAILED:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
      };
    case actions.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
      };
    case actions.REFRESH_TOKEN_FAILED:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
      };
    case actions.RESET_PASSWORD_SUCCESS:
      setCookie("token", JSON.stringify(action.payload.accessToken));
      return {
        ...state,
        isAuth: true,
        isLoading: false,
      };
    case actions.RESET_PASSWORD_FAILED:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
      };
    case actions.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isForgotPassword: action.payload,
      };
    case actions.FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        isForgotPassword: false,
      };
    case actions.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        isLoading: false,
      };
    case actions.GET_USER_FAILED: {
      console.log(action.payload);
      return {
        ...state,
        isAuth: false,
        user: null,
        isLoading: false,
      };
    }
    case actions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuth: true,
        isLoading: false,
      };
    case actions.UPDATE_USER_FAILED: {
      return {
        ...state,
        isAuth: false,
        isLoading: false,
      };
    }
    case actions.REGISTER_SUCCESS:
      setCookie("token", JSON.stringify(action.payload.accessToken));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.payload.refreshToken),
      );
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.accessToken),
      );
      return {
        ...state,
        user: action.payload.user,
        isAuth: true,
      };
    case actions.REGISTER_FAILED:
      return {
        ...state,
        isAuth: false,
      };
    case actions.LOGOUT_SUCCESS:
      localStorage.removeItem("accessToken");
      deleteCookie("token", null);
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
