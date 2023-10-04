import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import { useSelector } from "../../services/hooks";
import { State } from "../../services/store";

const OrderDetails = () => {
  const orderDetails = useSelector(
    (state: State) => state.orderDetailsReducer.orderDetails,
  );
  const isOrderFetching = useSelector(
    (state: State) => state.orderDetailsReducer.isOrderFetching,
  );
  const postOrderError = useSelector(
    (state: State) => state.orderDetailsReducer.postOrderError,
  );

  return (
    <>
      {(isOrderFetching && "Sending order...") ||
        (postOrderError && "Send order error") ||
        (orderDetails && (
          <div className={styles.orderDetails}>
            <p className="text text_type_digits-large mt-10">
              {orderDetails?.order.number}
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
