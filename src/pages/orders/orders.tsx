import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import CardOrder from "../../components/card-order/card-order";
import { getUser, logout } from "../../services/actions/auth";
import { wsAuthStart } from "../../services/actions/wsActions";
import { actions } from "../../services/constants";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { wsAuthUrl } from "../../utils/consts";
import styles from "./orders.module.css";

const Orders = () => {
  const user = useAppSelector((state) => state.authReducer.user);
  const dispatch = useAppDispatch();
  const messagesAuth = useAppSelector((state) => state.wsReducer.messagesAuth);
  const fetchMessagesAuth = useAppSelector(
    (state) => state.wsReducer.fetchMessagesAuth
  );
  const wsConnectedAuth = useAppSelector(
    (state) => state.wsReducer.wsConnectedAuth
  );

  useEffect(() => {
    !wsConnectedAuth && dispatch(wsAuthStart(wsAuthUrl));
    if (!user) {
      dispatch(getUser());
    }
    return () => {
      wsConnectedAuth && dispatch({ type: actions.WS_AUTH_CONNECTION_CLOSE });
    };
  }, [wsConnectedAuth]);

  return (
    <section className={styles.content}>
      <div className={styles.navigation}>
        <div className={styles.navItem}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Профиль
          </NavLink>
        </div>
        <div className={styles.navItem}>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            История заказов
          </NavLink>
        </div>
        <div className={styles.navItem}>
          <Link
            to="#"
            onClick={() => dispatch(logout())}
            className={styles.link}
          >
            Выход
          </Link>
        </div>
        <div className={styles.caption}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </div>

      <CardOrder
        fetchMessages={fetchMessagesAuth}
        wsConnected={wsConnectedAuth}
        messages={messagesAuth}
      />
    </section>
  );
};

export default Orders;
