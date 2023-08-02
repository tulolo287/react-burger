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


const OrderDetails = () => {
  return (
  <>
  Order det
  <p className="text text_type_digits-large">1234567890</p>
  <p className="text text_type_main-medium">
The quick brown fox jumps over the lazy dog.
</p>
<div className={styles.order_checkCircle}>
<CheckMarkIcon type="primary" />
</div>

<p className="text text_type_main-default">
The quick brown fox jumps over the lazy dog.
</p>
<p className="text text_type_main-default text_color_inactive">
The quick brown fox jumps over the lazy dog.
</p>
  </>
  )
  }
  export default OrderDetails