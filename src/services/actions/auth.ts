import { AppDispatch } from "../../services/types";
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
import {
  TError,
  TLogin,
  TResetPassword,
  TResponseBody,
  TTokens,
  TUser,
} from "../../utils/types";
import { authActions } from "../constants/auth";

export type ILoginSuccess = {
  readonly type: typeof authActions.LOGIN_SUCCESS;
  readonly user: TUser | null;
};
export interface ILoginFailed {
  readonly type: typeof authActions.LOGIN_FAILED;
  readonly err: TError;
}
export interface ILogoutSuccess {
  readonly type: typeof authActions.LOGOUT_SUCCESS;
  readonly response: TError;
}
export interface ILogoutFailed {
  readonly type: typeof authActions.LOGOUT_FAILED;
  readonly err: TError;
}
export interface IGetUser {
  readonly type: typeof authActions.GET_USER_SUCCESS;
  readonly user: TUser | null;
}
export interface IGetUserFailed {
  readonly type: typeof authActions.GET_USER_FAILED;
  readonly err: TError;
}
export interface IUpdateUser {
  readonly type: typeof authActions.UPDATE_USER_SUCCESS;
  readonly user: TUser | null;
}
export interface IUpdateUserFailed {
  readonly type: typeof authActions.UPDATE_USER_FAILED;
  readonly err: TError;
}
export interface IRegister {
  readonly type: typeof authActions.REGISTER_SUCCESS;
  readonly response: TResponseBody<"user", TUser>;
}
export interface IRegisterFailed {
  readonly type: typeof authActions.REGISTER_FAILED;
  readonly err: TError;
}
export interface IRefreshToken {
  readonly type: typeof authActions.REFRESH_TOKEN_SUCCESS;
  readonly tokens: TTokens;
}
export interface IRefreshTokenFailed {
  readonly type: typeof authActions.REFRESH_TOKEN_FAILED;
  readonly err: TError;
}
export interface IResetPassword {
  readonly type: typeof authActions.RESET_PASSWORD_SUCCESS;
  readonly response: TResponseBody<"password", TResetPassword>;
}
export interface IResetPasswordFailed {
  readonly type: typeof authActions.RESET_PASSWORD_FAILED;
  readonly err: TError;
}
export interface IGetUserFetching {
  readonly type: typeof authActions.GET_USER_FETCHING;
}
export interface IForgotPassword {
  readonly type: typeof authActions.FORGOT_PASSWORD_SUCCESS;
  readonly response: TError;
}

export interface IForgotPasswordFailed {
  readonly type: typeof authActions.FORGOT_PASSWORD_FAILED;
  readonly err: TError;
}

export type TAuthActions =
  | ILoginSuccess
  | ILoginFailed
  | ILogoutSuccess
  | ILogoutFailed
  | IGetUser
  | IGetUserFailed
  | IUpdateUser
  | IUpdateUserFailed
  | IRegister
  | IRegisterFailed
  | IRefreshToken
  | IRefreshTokenFailed
  | IResetPassword
  | IResetPasswordFailed
  | IGetUserFetching
  | IForgotPassword
  | IForgotPasswordFailed;

export const loginSuccess = (user: TUser | null): ILoginSuccess => ({
  type: authActions.LOGIN_SUCCESS,
  user,
});

export const loginFailed = (err: TError): ILoginFailed => ({
  type: authActions.LOGIN_FAILED,
  err,
});

export const logoutFailed = (err: TError): ILogoutFailed => ({
  type: authActions.LOGOUT_FAILED,
  err,
});

export const logoutSuccess = (response: TError): ILogoutSuccess => ({
  type: authActions.LOGOUT_SUCCESS,
  response,
});

export const getUserSuccess = (user: TUser | null): IGetUser => ({
  type: authActions.GET_USER_SUCCESS,
  user,
});

export const getUserFailed = (err: TError): IGetUserFailed => ({
  type: authActions.GET_USER_FAILED,
  err,
});

export const getUserFetching = (): IGetUserFetching => ({
  type: authActions.GET_USER_FETCHING,
});

export const updateUserSuccess = (user: TUser | null): IUpdateUser => ({
  type: authActions.UPDATE_USER_SUCCESS,
  user,
});

export const updateUserFailed = (err: TError): IUpdateUserFailed => ({
  type: authActions.UPDATE_USER_FAILED,
  err,
});

export const registerSuccess = (
  response: TResponseBody<"user", TUser>
): IRegister => ({
  type: authActions.REGISTER_SUCCESS,
  response,
});

export const registerFailed = (err: TError): IRegisterFailed => ({
  type: authActions.REGISTER_FAILED,
  err,
});

export const refreshTokenSuccess = (tokens: TTokens): IRefreshToken => ({
  type: authActions.REFRESH_TOKEN_SUCCESS,
  tokens,
});

export const refreshTokenFailed = (err: TError): IRefreshTokenFailed => ({
  type: authActions.REFRESH_TOKEN_FAILED,
  err,
});

export const resetPasswordSuccess = (
  response: TResponseBody<"password", TResetPassword>
): IResetPassword => ({
  type: authActions.RESET_PASSWORD_SUCCESS,
  response,
});

export const resetPasswordFailed = (err: TError): IResetPasswordFailed => ({
  type: authActions.RESET_PASSWORD_FAILED,
  err,
});

export const forgotPasswordSuccess = (response: TError): IForgotPassword => ({
  type: authActions.FORGOT_PASSWORD_SUCCESS,
  response,
});

export const forgotPasswordFailed = (err: TError): IForgotPasswordFailed => ({
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
      return response.user;
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
        console.log(response.message);
        return response.success;
      })
      .catch((err) => {
        dispatch(resetPasswordFailed(err));
        return err;
      });
  };

export const forgotPassword =
  (request: { email: string }) => async (dispatch: AppDispatch) => {
    return forgotPasswordApi(request)
      .then((response) => {
        dispatch(forgotPasswordSuccess(response));
      })
      .catch((err) => {
        dispatch(forgotPasswordFailed(err));
      });
  };
