import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services/hooks";
import styles from "./order-details.module.css";

const OrderDetails = () => {
  const orderDetails = useAppSelector(
    (state) => state.orderDetailsReducer.orderDetails
  );
  const isOrderFetching = useAppSelector(
    (state) => state.orderDetailsReducer.isOrderFetching
  );
  const postOrderError = useAppSelector(
    (state) => state.orderDetailsReducer.postOrderError
  );

  return (
    <>
      {(isOrderFetching && "Sending order...") ||
        (postOrderError && "Send order error") ||
        (orderDetails && (
          <div data-cy="order_details" className={styles.orderDetails}>
            <p className="text text_type_digits-large mt-10">
              {orderDetails?.number}
            </p>
            <p className="text text_type_main-medium mt-15 mb-15">
              идентификатор заказа
            </p>
            <div className={styles.done}>
              <i>
                <CheckMarkIcon type="primary" />
              </i>
            </div>
            <p className="text text_type_main-default mt-15">
              Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mt-2">
              Дождитесь готовности на орбитальной станции
            </p>
          </div>
        ))}
    </>
  );
};
export default OrderDetails;
