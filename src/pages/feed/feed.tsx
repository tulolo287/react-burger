import { memo, useEffect } from "react";
import CardOrder from "../../components/card-order/card-order";
import OrdersTotal from "../../components/orders-total/orders-total";
import Loader from "../../components/ui/loader/loader";
import { actions } from "../../services/constants";
import { useDispatch, useSelector } from "../../services/hooks";
import { startWS } from "../../utils";
import { wsAllUrl } from "../../utils/consts";
import styles from "./feed.module.css";

const Feed = memo(() => {
  const dispatch = useDispatch();
  const fetchMessages = useSelector((state) => state.wsReducer.fetchMessages);
  const wsConnected = useSelector((state) => state.wsReducer.wsConnected);

  useEffect(() => {
    dispatch(startWS(wsAllUrl));
    return () => {
      dispatch({ type: actions.WS_CONNECTION_CLOSE });
    };
  }, []);
  return (
    <div className={styles.content}>

        <>
          <h2 className={styles.header}>Лента заказов</h2>
          <section className={`${styles.orders}`}>
            <CardOrder />
            <OrdersTotal />
          </section>
        </>
  
    </div>
  );
});

export default Feed;
