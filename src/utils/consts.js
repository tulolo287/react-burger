import PropTypes from "prop-types";

export const API_URL = "https://norma.nomoreparties.space/api";

export const TYPES = {
  bun: { name: "Булки" },
  sauce: { name: "Соусы" },
  main: { name: "Начинки" },
};

export const SORT_ORDER = ["bun", "sauce", "main"];

export const item = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
});

export const ingredients = PropTypes.arrayOf(item);

export const path = {
  HOME: "/",
  INGREDIENT: "/ingredient/:id",
  LOGIN: "/login",
  REGISTER: "/register",
  RESET_PASSWORD: "/reset-password",
  FORGOT_PASSWORD: "/forgot-password",
  PROFILE: "/profile",
  ORDERS: "orders"
}
