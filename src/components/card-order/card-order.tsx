import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getIngredientsSelector } from "../../services/actions/ingredients";
import { TIngredient } from "../../utils/types";
import styles from "./card-order.module.css";

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

const CardOrder = () => {
  const ingredients: Array<TIngredient> = useSelector(getIngredientsSelector);
  const [orders, setOrders] = useState<Array<TOrder> | null>(null);

  useEffect(() => {
   
      const socket = new WebSocket(
        "wss://norma.nomoreparties.space/orders/all"
      );
      socket.onmessage = async (event) => {
        const message: TResponseOrders = await JSON.parse(event.data);

        if (message.success) {
          setOrders(message.orders);
          console.log(message.orders);
        }
      };

  }, []);

  return (
    <>
      {orders?.map((order, idx) => (
        <div className={styles.card_order}>
          <div className={`${styles.title} mt-6`}>
            <span>#{order.number}</span>
            <span>{order.createdAt}</span>
          </div>
          <h3 className={`${styles.name} mt-6`}>{order.name}</h3>
          <div className={`${styles.info} mt-6`}>
            <div className={styles.ingredients}>
              <div className={styles.ingredient_preview}></div>
            </div>
            <div>price:</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardOrder;
