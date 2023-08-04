import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  CheckMarkIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";
import styles from './ingredient-details.module.css'
import { DATA_ITEM } from "../../utils/consts";

const IngredientDetails = ({ item }) => {
  return (
    <section className={styles.ingredientDetails}>
      <p className="text text_type_main-large">
        The quick brown fox jumps over the lazy dog.
      </p>
      <img src={item.image_large} alt={item.name} />
      {item.name}

      <p className="text text_type_main-medium">
        The quick brown fox jumps over the lazy dog.
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {item.calories}
        {item.proteins}
        {item.fat}
        {item.carbohydrates}
      </p>
    </section>
  );
};

IngredientDetails.defaultProps = DATA_ITEM
export default IngredientDetails;
