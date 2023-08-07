import PropTypes from "prop-types";

const URL = "https://norma.nomoreparties.space/api/ingredients"

const TYPES = {
  bun: { name: "Булки" },
  sauce: { name: "Соусы" },
  main: { name: "Начинки" },
};

const SORT_ORDER = ["bun", "sauce", "main"];

const item = PropTypes.shape({
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
})

const data = PropTypes.arrayOf(item)

export { URL, SORT_ORDER, TYPES, data, item }