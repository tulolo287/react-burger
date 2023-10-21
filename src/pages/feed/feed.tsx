import { memo, useEffect } from "react";
import CardOrder from "../../components/card-order/card-order";
import OrdersTotal from "../../components/orders-total/orders-total";
import { wsStart } from "../../services/actions/wsActions";
import { wsActions } from "../../services/constants/wsConsts";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { wsAllUrl } from "../../utils/consts";
import styles from "./feed.module.css";

const Feed = memo(() => {
  const dispatch = useAppDispatch();
  const wsConnected = useAppSelector((state) => state.wsReducer.wsConnected);
  const messages = useAppSelector((state) => state.wsReducer.messages);
  const fetchMessages = useAppSelector(
    (state) => state.wsReducer.fetchMessages
  );

  useEffect(() => {
    !wsConnected && dispatch(wsStart(wsAllUrl));
    return () => {
      wsConnected && dispatch({ type: wsActions.WS_CONNECTION_CLOSE });
    };
  }, [wsConnected]);

  return (
    <div className={styles.content}>
      <>
        <h2 className={styles.header}>Лента заказов</h2>
        <section className={`${styles.orders}`}>
          <CardOrder
            fetchMessages={fetchMessages}
            wsConnected={wsConnected}
            messages={messages}
          />
          <OrdersTotal />
        </section>
      </>
    </div>
  );
});

export default Feed;
