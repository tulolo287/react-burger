import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";

const OrderDetails = ({ orderNumber }) => {
  return (
    <div className={styles.orderDetails}>
      <p className="text text_type_digits-large">
        {orderNumber && orderNumber.order.number}
      </p>
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
