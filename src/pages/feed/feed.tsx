import CardOrder from "../../components/card-order/card-order";
import OrdersTotal from "../../components/orders-total/orders-total";
import styles from "./feed.module.css";

const Feed = () => {
  

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.header}>Лента заказов</h2>

        <section className={`${styles.orders}`}>
          <CardOrder wsUrl="wss://norma.nomoreparties.space/orders/all" />
          <OrdersTotal />
        </section>
      </div>
    </div>
  );
};

export default Feed;
