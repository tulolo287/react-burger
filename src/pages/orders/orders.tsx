import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import CardOrder from "../../components/card-order/card-order";
import { logout } from "../../services/actions/auth";
import { useSelector } from "../../services/hooks";
import { AppDispatch, State } from "../../services/types";
import styles from "./orders.module.css";

const Orders = () => {
  const user = useSelector((state: State) => state.authReducer.user);
  const dispatch: AppDispatch = useDispatch();

  return (
    <section className={styles.content}>
      <div className={styles.navigation}>
        <div className={styles.navItem}>
          <NavLink
            to="/profile"
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
          <NavLink
            to=""
            onClick={() => dispatch(logout())}
            className={styles.link}
          >
            Выход
          </NavLink>
        </div>
        <div className={styles.caption}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </div>

      <div className={styles.form}>
        <CardOrder />
      </div>
    </section>
  );
};

export default Orders;
