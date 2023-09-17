import jwtDecode from "jwt-decode";
import { API_URL } from "./consts";
import {
  TIngredient,
  TLogin,
  TResetPassword,
  TResponseBody,
  TTokens,
  TUser,
} from "./types";

export const getIngredientsApi = async (): Promise<
  TResponseBody<"data", Array<TIngredient>>
> =>
  await fetch(`${API_URL}/ingredients`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => Promise.reject(err));

export const postOrderApi = async (request: []) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(request),
    });
    const result = await checkResponse(response);
    return result.success ? result : Promise.reject(result);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const loginApi = async (data: TLogin) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    const result = await checkResponse(response);

    if (result.success) {
      saveResponse(result);
      return result;
    } else {
      return Promise.reject(result);
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const logoutApi = async () => {
  let token = localStorage.getItem("refreshToken")?.replace(/^"(.*)"$/, "$1");

  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ token }),
    });
    const result = await checkResponse(response);
    return result;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getUserApi = async (): Promise<TResponseBody<"user", TUser>> => {
  let token: string = "";
  if (
    (localStorage.getItem("accessTokenExp") &&
      localStorage.getItem("refreshToken")) ||
    !getCookie("token")
  ) {
    const accessTokenExp = Number(localStorage.getItem("accessTokenExp") || 0);
    if (Date.now() >= accessTokenExp * 1000) {
      const result = await refreshTokenApi();
      if (result.success) {
        token = getCookie("token")?.replace(/^"(.*)"$/, "$1")!!;
      } else throw Error("No token found");
    }
  }
  token = getCookie("token")?.replace(/^"(.*)"$/, "$1")!!;
  const options = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
  return fetchWithRefresh(`${API_URL}/auth/user`, options);
};

export const updateUserApi = async (
  data: TUser
): Promise<TResponseBody<"user", TUser>> => {
  let token = getCookie("token")?.replace(/^"(.*)"$/, "$1");
  const options = {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  };
  return fetchWithRefresh(`${API_URL}/auth/user`, options);
};

export const registerApi = async (request: TUser) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(request),
    });
    return await checkResponse(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const refreshTokenApi = async (): Promise<TTokens> => {
  if (localStorage.getItem("refreshToken")) {
    let token = localStorage.getItem("refreshToken")?.replace(/^"(.*)"$/, "$1");

    try {
      const response = await fetch(`${API_URL}/auth/token`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ token }),
      });
      const result = await checkResponse(response);
      saveResponse(result);
      return result.success ? result : Promise.reject(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  throw new Error("No refresh token");
};

export const resetPasswordApi = async (
  request: TResetPassword
): Promise<TResponseBody<"password", TResetPassword>> => {
  try {
    const response = await fetch(`${API_URL}/password-reset/reset`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(request),
    });
    const result = await checkResponse(response);
    return result.success ? result : result.message;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const forgotPasswordApi = async (request: { email: string }) => {
  try {
    const response = await fetch(`${API_URL}/password-reset`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(request),
    });
    const result = await checkResponse(response);
    return result.success ? result : false;
  } catch (err) {
    return Promise.reject(err);
  }
};

const fetchWithRefresh = async (
  url: string,
  options: any
): Promise<TResponseBody<"user", TUser>> => {
  try {
    const response = await fetch(url, options);
    const result = await checkResponse(response);
    return result.success ? result : Promise.reject(result);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshTokenApi();
      saveResponse(refreshData);
      options.headers.authorization = refreshData.accessToken;
      const response = await fetch(url, options);
      const result = await checkResponse(response);
      return result.success ? result : Promise.reject(result);
    } else {
      return Promise.reject(err);
    }
  }
};

const saveResponse = (result: TTokens) => {
  const decodedToken: any = jwtDecode(result.accessToken);
  localStorage.setItem("accessTokenExp", decodedToken.exp);
  localStorage.setItem("refreshToken", result.refreshToken);
  localStorage.setItem("accessToken", result.accessToken);
  setCookie("token", JSON.stringify(result.accessToken), null);
};

const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: Error) => Promise.reject(err));
};

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: any, props: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}
