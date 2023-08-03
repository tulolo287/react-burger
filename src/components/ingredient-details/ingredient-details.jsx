import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  CheckMarkIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";

const IngredientDetails = ({ item }) => {
  return (
    <>
      <p className="text text_type_main-large">
        The quick brown fox jumps over the lazy dog.
      </p>
      <img src={item.image} alt={item.name} />
      {item.name}

      <p className="text text_type_main-medium">
        The quick brown fox jumps over the lazy dog.
      </p>
      <p className="text text_type_main-default text_color_inactive">
        The quick brown fox jumps over the lazy dog.
      </p>
    </>
  );
};
export default IngredientDetails;
