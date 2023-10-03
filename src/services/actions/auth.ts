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
import { TLogin, TResetPassword, TResponseBody, TTokens, TUser } from "../../utils/types";
import { authActions } from "../constants/auth";

export interface ILoginSuccess {
  readonly type: typeof authActions.LOGIN_SUCCESS;
  readonly user: TUser;
}

export const loginSuccess = (user: TUser): ILoginSuccess => ({
  type: authActions.LOGIN_SUCCESS,
  user,
});

export interface ILoginFailed {
  readonly type: typeof authActions.LOGIN_FAILED;
  readonly err: any;
}

export const loginFailed = (err: any): ILoginFailed => ({
  type: authActions.LOGIN_FAILED,
  err,
});

export interface ILogoutFailed {
  readonly type: typeof authActions.LOGIN_FAILED;
  readonly err: any;
}

export const logoutFailed = (err: any): ILogoutFailed => ({
  type: authActions.LOGOUT_FAILED,
  err,
});


export interface ILogoutSuccess {
  readonly type: typeof authActions.LOGOUT_SUCCESS;
  readonly response: any;
}

export const logoutSuccess = (response: any): ILogoutSuccess => ({
  type: authActions.LOGOUT_SUCCESS,
  response,
});


export interface IGetUser {
  readonly type: typeof authActions.LOGOUT_SUCCESS;
  readonly user: TUser;
}

export const getUserSuccess = (user: TUser): IGetUser => ({
  type: authActions.GET_USER_SUCCESS,
  user,
});

export interface IGetUserFailed {
  readonly type: typeof authActions.LOGIN_FAILED;
  readonly err: any;
}

export const getUserFailed = (err: any): IGetUserFailed => ({
  type: authActions.GET_USER_FAILED,
  err,
});
export interface IGetUserFetching {
  readonly type: typeof authActions.GET_USER_FETCHING;
}

export const getUserFetching = (): IGetUserFetching => ({
  type: authActions.GET_USER_FETCHING,
});

export interface IUpdateUser {
  readonly type: typeof authActions.UPDATE_USER_SUCCESS;
  readonly user: TUser;
}

export const updateUserSuccess = (user: TUser): IUpdateUser => ({
  type: authActions.UPDATE_USER_SUCCESS,
  user,
});

export interface IUpdateUserFailed {
  readonly type: typeof authActions.UPDATE_USER_FAILED;
  readonly err: any;
}

export const updateUserFailed = (err: any): IUpdateUserFailed => ({
  type: authActions.UPDATE_USER_FAILED,
  err,
});
export interface IRegister {
  readonly type: typeof authActions.UPDATE_USER_SUCCESS;
  readonly user: TUser;
}

export const registerSuccess = (user: TUser): IRegister => ({
  type: authActions.REGISTER_SUCCESS,
  user,
});

export interface IRegisterFailed {
  readonly type: typeof authActions.UPDATE_USER_FAILED;
  readonly err: any;
}

export const registerFailed = (err: any): IRegisterFailed => ({
  type: authActions.REGISTER_FAILED,
  err,
});


export interface IRefreshToken {
  readonly type: typeof authActions.REFRESH_TOKEN_SUCCESS;
  readonly tokens: TTokens;
}

export const refreshTokenSuccess = (tokens: TTokens): IRefreshToken => ({
  type: authActions.REFRESH_TOKEN_SUCCESS,
  tokens,
});

export interface IRefreshTokenFailed {
  readonly type: typeof authActions.REFRESH_TOKEN_FAILED;
  readonly err: any;
}

export const refreshTokenFailed = (err: any): IRefreshTokenFailed => ({
  type: authActions.REFRESH_TOKEN_FAILED,
  err,
});


export interface IResetPassword {
  readonly type: typeof authActions.RESET_PASSWORD_SUCCESS;
  readonly response: TResponseBody<"password", TResetPassword>;
}

export const resetPasswordSuccess = (response: TResponseBody<"password", TResetPassword>): IResetPassword => ({
  type: authActions.RESET_PASSWORD_SUCCESS,
  response,
});

export interface IResetPasswordFailed {
  readonly type: typeof authActions.RESET_PASSWORD_FAILED;
  readonly err: any;
}

export const resetPasswordFailed = (err: any): IResetPasswordFailed => ({
  type: authActions.RESET_PASSWORD_FAILED,
  err,
});

export interface IForgotPassword {
  readonly type: typeof authActions.FORGOT_PASSWORD_SUCCESS;
  readonly response: any;
}

export const forgotPasswordSuccess = (response: any): IForgotPassword => ({
  type: authActions.FORGOT_PASSWORD_SUCCESS,
  response,
});

export interface IForgotPasswordFailed {
  readonly type: typeof authActions.FORGOT_PASSWORD_FAILED;
  readonly err: any;
}

export const forgotPasswordFailed = (err: any): IForgotPasswordFailed => ({
  type: authActions.FORGOT_PASSWORD_FAILED,
  err,
});




export const login = (data: TLogin) => async (dispatch: AppDispatch) => {
  return loginApi(data)
    .then((response) => {
      dispatch(loginSuccess(response.user));
    })
    .catch((err) => {
      dispatch(loginFailed(err));
    });
};

export const logout = () => async (dispatch: AppDispatch) => {
  return logoutApi()
    .then((response) => {
      dispatch(logoutSuccess(response));
      return response;
    })
    .catch((err) => {
      dispatch(logoutFailed(err));
    });
};

export const getUser = () => async (dispatch: AppDispatch) => {
  dispatch(getUserFetching());
  return getUserApi()
    .then((response) => {
      dispatch(getUserSuccess(response.user));
    })
    .catch((err) => {
      dispatch(getUserFailed(err));
    });
};

export const updateUser = (data: TUser) => async (dispatch: AppDispatch) => {
  dispatch(getUserFetching());
  return updateUserApi(data)
    .then((response) => {
      dispatch(updateUserSuccess(response.user));
      return response.user;
    })
    .catch((err) => {
      dispatch(updateUserFailed(err));
    });
};

export const register = (request: TUser) => async (dispatch: AppDispatch) => {
  return registerApi(request)
    .then((response) => {
      dispatch(registerSuccess(response));
    })
    .catch((err) => {
      dispatch(registerFailed(err));
    });
};

export const refreshToken = () => async (dispatch: AppDispatch) => {
  return refreshTokenApi()
    .then((tokens) => {
      dispatch(refreshTokenSuccess(tokens));
    })
    .catch((err) => {
      dispatch(refreshTokenFailed(err));
    });
};

export const resetPassword =
  (request: TResetPassword) => async (dispatch: AppDispatch) => {
    return resetPasswordApi(request)
      .then((response) => {
        dispatch(resetPassword(response.password));
        return response;
      })
      .catch((err) => {
        dispatch(resetPasswordFailed(err));
        return err;
      });
  };

export const forgotPassword =
  (request: any) => async (dispatch: AppDispatch) => {
    return forgotPasswordApi(request)
      .then((response) => {
        dispatch(forgotPasswordSuccess(response));
      })
      .catch((err) => {
        dispatch(forgotPasswordFailed(err));
      });
  };
