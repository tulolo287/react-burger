export const API_URL = "https://norma.nomoreparties.space/api";

export type TCategory = {
  name: string;
};

interface AssociativeArray<T> {
  [key: string]: T;
}

export const TYPES: AssociativeArray<TCategory> = {
  bun: { name: "Булки" },
  sauce: { name: "Соусы" },
  main: { name: "Начинки" },
};

export const SORT_ORDER = ["bun", "sauce", "main"];

export const path = {
  HOME: "/",
  INGREDIENT: "/ingredient/:id",
  LOGIN: "/login",
  REGISTER: "/register",
  RESET_PASSWORD: "/reset-password",
  FORGOT_PASSWORD: "/forgot-password",
  PROFILE: "/profile",
  PROFILE_ORDERS: "/profile/orders",
  PROFILE_ORDERS_ID: "/profile/orders/:id",
  ORDERS: "/profile/orders",
  FEED: "/feed",
  FEED_DETAILS: "/feed/:id",
};

export type TPath = typeof path;

export const accessToken = localStorage.getItem("accessToken")?.split(" ")[1];

export const wsAuthUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
export const wsAllUrl = "wss://norma.nomoreparties.space/orders/all"; 
