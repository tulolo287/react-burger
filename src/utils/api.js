import { API_URL } from "./consts";

export const getIngredientsApi = async () => {
  try {
    const response = await fetch(`${API_URL}/ingredients`);
    const result = await checkResponse(response);
    return result.success ? result.data : false;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const postOrderApi = async (request) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(request),
    });
    const result = await checkResponse(response);
    return result.success ? result : false;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const loginApi = async (data) => {
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
      return result;
    } else {
      return false;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getUserApi = async () => {
  let token = getCookie("token");
  token = token.replace(/^"(.*)"$/, "$1");
  try {
    const response = await fetch(`${API_URL}/auth/user`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    const result = await checkResponse(response);
    return result.success ? result : false;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const registerApi = async (request) => {
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
    const result = await checkResponse(response);
    return result.success ? result : false;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const refreshTokenApi = async () => {
  let token = localStorage.getItem("refreshToken");
  token = token.replace(/^"(.*)"$/, "$1");
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
    return result.success ? result : false;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const resetPasswordApi = async (request) => {
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
    return result.success ? result : false;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const forgotPasswordApi = async (request) => {
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

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
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

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
