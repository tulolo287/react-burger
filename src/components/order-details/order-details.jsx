import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./order-details.module.css";

const OrderDetails = () => {
  return (
    <div className={styles.orderDetails}>
      <p className="text text_type_digits-large">034536</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <div className={styles.order_checkCircle}>
        <i>
          <CheckMarkIcon type="primary" />
        </i>
      </div>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
export default OrderDetails;
