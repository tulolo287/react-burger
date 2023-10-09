import { useEffect, useState } from "react";
import { useSelector } from "../../services/hooks";
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

const OrdersTotal = () => {
  const messages = useSelector((state) => state.wsReducer.messages);

  const [ordersDone, setOrdersDone] = useState<Array<TOrder> | null>(null);
  const [ordersInWork, setOrdersInWork] = useState<Array<TOrder> | null>(null);

  useEffect(() => {
    const done: any = messages?.orders?.filter(
      (order) => order?.status === "done",
    );
    const inWork: any = messages?.orders?.filter(
      (order) => order?.status === "inWork",
    );
    setOrdersDone(done);
    setOrdersInWork(inWork);
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.board}>
        <div className={`${styles.done} mr-9`}>
          <h4 className={`${styles.title} mt-6`}>Готовы:</h4>

          <p className={`${styles.order_done} mt-2`}>0123232</p>
          <p className={`${styles.order_done} mt-2`}>0123232</p>
          <p className={`${styles.order_done} mt-2`}>0123232</p>
          <p className={`${styles.order_done} mt-2`}>0123232</p>
        </div>
        <div className={styles.inWork}>
          <h4 className={`${styles.title} mt-6`}>В работе:</h4>
          <p className={`${styles.order_inWork} mt-2`}>0123232</p>
          <p className={`${styles.order_inWork} mt-2`}>0123232</p>
          <p className={`${styles.order_inWork} mt-2`}>0123232</p>
          <p className={`${styles.order_inWork} mt-2`}>0123232</p>
        </div>
      </div>
      <div className={`${styles.completed} mt-15`}>
        <h4>Выполнено за все время:</h4>
        <span className="text text_type_digits-large">43232</span>
      </div>
      <div className={`${styles.completed} mt-15`}>
        <h4>Выполнено за сегодня:</h4>
        <span className="text text_type_digits-large">432</span>
      </div>
    </section>
  );
};

export default OrdersTotal;
