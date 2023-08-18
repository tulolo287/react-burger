import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const orderDetails = useSelector(
    (state) => state.orderDetailsReducer.orderDetails
  );
  const isOrderFetching = useSelector(
    (state) => state.orderDetailsReducer.isOrderFetching
  );
  const postOrderError = useSelector(
    (state) => state.orderDetailsReducer.postOrderError
  );

  return (
    <>
      {(isOrderFetching && "Sending order...") ||
        (postOrderError && "Send order error") ||
        (orderDetails && (
          <div className={styles.orderDetails}>
            <p className="text text_type_digits-large">
              {orderDetails?.order.number}
            </p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <div className={styles.order_checkCircle}>
              <i>
                <CheckMarkIcon type="primary" />
              </i>
            </div>
            <p className="text text_type_main-default">
              Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
              Дождитесь готовности на орбитальной станции
            </p>
          </div>
        ))}
    </>
  );
};
export default OrderDetails;
