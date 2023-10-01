import { FC } from "react";
import styles from "./order-total.module.css";

type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

type TOrderTotalProps = {
  ordersDone: TOrder[];
  ordersInWork: TOrder[];
};

const OrdersTotal: FC<TOrderTotalProps> = ({ ordersDone, ordersInWork }) => {
  return (
    <div>
      <div className={styles.board}>
        <div className={`${styles.done} mr-9`}>
          <h4 className={`${styles.title} mt-6`}>Done:</h4>
          {ordersDone?.map((order) => (
            <h5 className={`${styles.order_done} mt-2`}>{order.number}</h5>
          ))}
        </div>
        <div className={styles.inWork}>
          <h4 className={`${styles.title} mt-6`}>In work:</h4>

          {ordersInWork?.map((order) => (
            <h5 className={`${styles.order_inWork} mt-2`}>{order.number}</h5>
          ))}
        </div>
      </div>
      <div className={`${styles.completed} mt-15`}>
        <h4>Выполнено за все время:</h4>
        <span className="text text_type_digits-large">432432432</span>
      </div>
      <div className={`${styles.completed} mt-15`}>
        <h4>Выполнено за сегодня:</h4>
        <span className="text text_type_digits-large">432</span>
      </div>
    </div>
  );
};

export default OrdersTotal;
