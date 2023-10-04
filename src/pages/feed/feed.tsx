import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardOrder from "../../components/card-order/card-order";
import OrdersTotal from "../../components/orders-total/orders-total";
import { actions } from "../../services/constants";
import { AppDispatch } from "../../services/types";
import styles from "./feed.module.css";
import { useSelector } from "../../services/hooks";
import { getOrders } from "../../services/actions/wsActions";

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
 // const [orders, setOrders] = useState<Array<TOrder> | null>(null);
  const [ordersDone, setOrdersDone] = useState<Array<TOrder> | null>(null);
  const [ordersInWork, setOrdersInWork] = useState<Array<TOrder> | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(state => state.wsReducer.messages)

const orders: TOrder | null = null
  useEffect(() => {
   getOrders("/all")
    
    console.log(orders)
  }, []);

const getOrders = async (url:string) => {
  dispatch({ type: actions.WS_CONNECTION_START});
}
  

  return (
    <div>
      <h2 className={styles.header}>Лента заказов</h2>
      <section className={styles.content}>
        <article className={`${styles.orders} mr-15`}>
          <CardOrder  />
        </article>
        <article className={styles.orders_total}>
         <OrdersTotal/>
        </article>
      </section>
    </div>
  );
};

export default Feed;
