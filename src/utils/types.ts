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
};
export type TIngredients = Array<TIngredient>;

export type TConstructorIngredient = TIngredient & {
  key: string;
};
export type TConstructorIngredients = Array<TConstructorIngredient>;

export type IUser = {
  name: string;
  email: string;
  password: string;
};
