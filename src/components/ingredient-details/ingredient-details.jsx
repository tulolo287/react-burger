import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  CheckMarkIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./order-details.module.css";
import PropTypes from 'prop-types'


const IngredientDetails = ({item}) => {
  return (
  <>
  <img src={item.image} alt={item.name}/>
  {item.name}
  
  </>
  )
  }
  export default IngredientDetails