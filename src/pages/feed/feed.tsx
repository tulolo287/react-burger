import { useEffect, useState } from "react";
import CardOrder from "../../components/card-order/card-order";
import OrdersTotal from "../../components/orders-total/orders-total";
import styles from "./feed.module.css";

type TResponse = {
  success: boolean;
};

type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

type TResponseOrders = {
  orders: TOrder[];
  total: number;
  totalToday: number;
} & TResponse;

const Feed = () => {
  const [orders, setOrders] = useState<Array<TOrder> | null>(null);
  const [ordersDone, setOrdersDone] = useState<Array<TOrder> | null>(null);
  const [ordersInWork, setOrdersInWork] = useState<Array<TOrder> | null>(null);

  useEffect(() => {
    const socket = new WebSocket("wss://norma.nomoreparties.space/orders/all");
    socket.onmessage = async (event) => {
      const message: TResponseOrders = await JSON.parse(event.data);
      if (message.success) {
        setOrders(message.orders);
        const done = message.orders.filter(order => order.status === "done")
        const inWork = message.orders.filter(order => order.status === "inWork")
        setOrdersDone(done);
        setOrdersInWork(inWork);
      }
    };
  }, []);

  return (
    <div>
      <h2 className={styles.header}>Лента заказов</h2>
      <section className={styles.content}>
        <article className={`${styles.orders} mr-15`}>
          <CardOrder orders={orders} />
        </article>
        <article className={styles.orders_total}>
          <OrdersTotal ordersDone={ordersDone} ordersInWork={ordersInWork} />
        </article>
      </section>
    </div>
  );
};

export default Feed;
