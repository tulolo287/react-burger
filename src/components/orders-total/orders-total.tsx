import { Fragment, useEffect, useState } from "react";
import { useSelector } from "../../services/hooks";
import { TOrder } from "../../utils/types";
import styles from "./order-total.module.css";

const OrdersTotal = () => {
  const messages = useSelector((state) => state.wsReducer.messages);
  const [ordersDone, setOrdersDone] = useState<TOrder[]>();
  const [ordersInWork, setOrdersInWork] = useState<TOrder[]>();

  useEffect(() => {
    const done = messages?.orders?.filter((order) => order?.status === "done");
    const inWork = messages?.orders?.filter(
      (order) => order?.status === "inWork"
    );
    setOrdersDone(done);
    setOrdersInWork(inWork);
  }, [messages]);

  return (
    <section className={styles.container}>
      <div className={styles.board}>
        <div className={`${styles.done} mr-9`}>
          <h4 className={`${styles.title} mt-6`}>Готовы:</h4>
          <ul className={styles.order_numbers}>
            {ordersDone?.map((order) => (
              <Fragment key={order._id}>
                <p className={`${styles.order_done} mr-2`}>{order.number}</p>
              </Fragment>
            ))}
          </ul>
        </div>
        <div className={styles.inWork}>
          <h4 className={`${styles.title} mt-6`}>В работе:</h4>
          {ordersInWork?.map((order) => (
            <Fragment key={order._id}>
              <p className={`${styles.order_inWork} mt-2`}>{order.number}</p>
            </Fragment>
          ))}
        </div>
      </div>
      <div className={styles.total}>
        <div className={`${styles.completed} mt-15`}>
          <h4>Выполнено за все время:</h4>
          <span className="text text_type_digits-large">{messages?.total}</span>
        </div>
        <div className={`${styles.completed} mt-15`}>
          <h4>Выполнено за сегодня:</h4>
          <span className="text text_type_digits-large">
            {messages?.totalToday}
          </span>
        </div>
      </div>
    </section>
  );
};

export default OrdersTotal;
