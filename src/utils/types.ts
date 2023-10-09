import { string } from "prop-types";

export type TIngredient = {
  _id: string;
  __v: number;
  name: string;
  type: string;
  price: number;
  proteins: number;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  qty: number | null;
  key: string;
};

export type TIngredientsData = {
  data: Array<TIngredient>;
};

export type TIngredients = Array<TIngredient>;

export type TConstructorIngredient = TIngredient & {
  key: string;
};
export type TConstructorIngredients = Array<TConstructorIngredient>;

export type TResetPassword = {
  token: string;
  password: string;
};

export type TUser = {
  name: string;
  email: string;
  password?: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
  accessToken?: string;
  refreshToken?: string;
};

export type TTokens = {
  message: string;
  success: boolean;
  accessTokenExp?: number;
  refreshToken: string;
  accessToken: string;
};

export interface AssociativeArray<T> {
  [key: string]: T;
}

export type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: Date | string;
  updatedAt: string;
  number: number;
};
