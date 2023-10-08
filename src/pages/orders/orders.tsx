import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import CardOrder from "../../components/card-order/card-order";
import { getUser, logout } from "../../services/actions/auth";
import { actions } from "../../services/constants";
import { useDispatch, useSelector } from "../../services/hooks";
import { AppDispatch, State } from "../../services/types";
import { startWS } from "../../utils";
import { wsAuthUrl } from "../../utils/consts";
import styles from "./orders.module.css";

const Orders = () => {
  const user = useSelector((state: State) => state.authReducer.user);
  const dispatch: AppDispatch = useDispatch();
  const wsConnected = useSelector((state) => state.wsReducer.wsConnected);
  const getMessages = useSelector((state) => state.wsReducer.fetchMessages);

  useEffect(() => {
     const accessToken = localStorage.getItem("accessToken")?.split(" ")[1];

const wsAuthUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
    console.log("WWWW", wsAuthUrl)
    dispatch(startWS(wsAuthUrl));
    if (!user) {
      dispatch(getUser());
    }
    return () => {
      dispatch({ type: actions.WS_CONNECTION_CLOSE });
    };
  }, []);

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

      <div className={`${styles.orders}`}>
        <CardOrder />
      </div>
    </section>
  );
};

export default Orders;
