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
  ORDERS: "orders",
};

export type TPath = typeof path;
