import { actions } from ".";
import { AppDispatch } from "../..";
import {
  forgotPasswordApi,
  getUserApi,
  loginApi,
  logoutApi,
  refreshTokenApi,
  registerApi,
  resetPasswordApi,
  updateUserApi,
} from "../../utils/api";
import { IUser } from "../../utils/types";

export const authActions = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILED: "LOGOUT_FAILED",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILED: "REGISTER_FAILED",
  GET_USER_SUCCESS: "GET_USER_SUCCESS",
  GET_USER_FAILED: "GET_USER_FAILED",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILED: "UPDATE_USER_FAILED",
  RESET_PASSWORD: "RESET_PASSWORD",
  GET_USER_FETCHING: "GET_USER_FETCHING",
  REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS",
  REFRESH_TOKEN_FAILED: "REFRESH_TOKEN_FAILED",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED",
};

export const login = (data: any) => async (dispatch: any) => {
  return loginApi(data)
    .then((user) => {
      dispatch({ type: actions.LOGIN_SUCCESS, payload: user });
    })
    .catch((err) => {
      dispatch({
        type: actions.LOGIN_FAILED,
        payload: err,
      });
    });
};

export const logout = () => async (dispatch: any) => {
  return logoutApi()
    .then((response) => {
      dispatch({ type: actions.LOGOUT_SUCCESS, payload: response });
      return response;
    })
    .catch((err) => {
      dispatch({
        type: actions.LOGOUT_FAILED,
        payload: err,
      });
    });
};

export const getUser = () => async (dispatch: any) => {
  dispatch({ type: actions.GET_USER_FETCHING });
  return getUserApi()
    .then((user) => {
      dispatch({ type: actions.GET_USER_SUCCESS, payload: user });
    })
    .catch((err) => {
      dispatch({
        type: actions.GET_USER_FAILED,
        payload: err,
      });
    });
};

export const updateUser = (data: any) => async (dispatch: any) => {
  dispatch({ type: actions.GET_USER_FETCHING });
  return updateUserApi(data)
    .then((response) => {
      dispatch({ type: actions.UPDATE_USER_SUCCESS, payload: response });
      return response;
    })
    .catch((err) => {
      dispatch({
        type: actions.UPDATE_USER_FAILED,
        payload: err,
      });
    });
};

export const register = (request:IUser) => async (dispatch: AppDispatch) => {
  return registerApi(request)
    .then((response) => {
      dispatch({ type: actions.REGISTER_SUCCESS, payload: response });
    })
    .catch((err) => {
      dispatch({
        type: actions.REGISTER_FAILED,
        payload: err,
      });
    });
};

export const refreshToken =
  () =>
  async (dispatch: any): Promise<void> => {
    return refreshTokenApi()
      .then((tokens) => {
        dispatch({ type: actions.REFRESH_TOKEN_SUCCESS, payload: tokens });
      })
      .catch((err) => {
        dispatch({
          type: actions.REFRESH_TOKEN_FAILED,
          payload: err,
        });
      });
  };

export const resetPassword = (request: any) => async (dispatch: any) => {
  return resetPasswordApi(request)
    .then((response) => {
      dispatch({ type: actions.RESET_PASSWORD_SUCCESS, payload: response });
      return response;
    })
    .catch((err) => {
      dispatch({
        type: actions.RESET_PASSWORD_FAILED,
        payload: err,
      });
      return err;
    });
};

export const forgotPassword = (request: any) => async (dispatch: any) => {
  return forgotPasswordApi(request)
    .then((response) => {
      dispatch({
        type: actions.FORGOT_PASSWORD_SUCCESS,
        payload: response.success,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.FORGOT_PASSWORD_FAILED,
        payload: err,
      });
    });
};
