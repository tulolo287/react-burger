import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppDispatch, State } from "../../services/store";
import { logout } from "../../services/actions/auth";
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
            to="orders"
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
        <div className={styles.form}>
          <div className={styles.input}>
            <input type="text" name="name" placeholder={user.name} />
            <i>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.9897 16.8541L2.67591 20.3576C2.44981 20.9605 3.03858 21.5493 3.6415 21.3232L7.14496 20.0094C7.54594 19.859 7.91009 19.6245 8.21291 19.3217L18.36 9.17461C18.36 9.17461 18.0064 8.11395 16.9458 7.05329C15.8851 5.99263 14.8244 5.63908 14.8244 5.63908L4.67737 15.7862C4.37455 16.089 4.14007 16.4532 3.9897 16.8541ZM16.2386 4.22486L17.6224 2.84111C17.8705 2.59298 18.2009 2.43512 18.5471 2.4925C19.0338 2.57318 19.7785 2.81495 20.4813 3.51776C21.1841 4.22056 21.4259 4.96528 21.5065 5.45198C21.5639 5.79816 21.4061 6.12852 21.1579 6.37664L19.7742 7.7604C19.7742 7.7604 19.4206 6.69974 18.36 5.63908C17.2993 4.57842 16.2386 4.22486 16.2386 4.22486Z"
                  fill="#F2F2F3"
                />
              </svg>
            </i>
          </div>
          <div className={styles.input}>
            <input type="text" name="email" placeholder={user.email} />
            <i>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.9897 16.8541L2.67591 20.3576C2.44981 20.9605 3.03858 21.5493 3.6415 21.3232L7.14496 20.0094C7.54594 19.859 7.91009 19.6245 8.21291 19.3217L18.36 9.17461C18.36 9.17461 18.0064 8.11395 16.9458 7.05329C15.8851 5.99263 14.8244 5.63908 14.8244 5.63908L4.67737 15.7862C4.37455 16.089 4.14007 16.4532 3.9897 16.8541ZM16.2386 4.22486L17.6224 2.84111C17.8705 2.59298 18.2009 2.43512 18.5471 2.4925C19.0338 2.57318 19.7785 2.81495 20.4813 3.51776C21.1841 4.22056 21.4259 4.96528 21.5065 5.45198C21.5639 5.79816 21.4061 6.12852 21.1579 6.37664L19.7742 7.7604C19.7742 7.7604 19.4206 6.69974 18.36 5.63908C17.2993 4.57842 16.2386 4.22486 16.2386 4.22486Z"
                  fill="#F2F2F3"
                />
              </svg>
            </i>
          </div>
          <div className={styles.input}>
            <input type="password" name="password" placeholder="Пароль" />
            <i>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.9897 16.8541L2.67591 20.3576C2.44981 20.9605 3.03858 21.5493 3.6415 21.3232L7.14496 20.0094C7.54594 19.859 7.91009 19.6245 8.21291 19.3217L18.36 9.17461C18.36 9.17461 18.0064 8.11395 16.9458 7.05329C15.8851 5.99263 14.8244 5.63908 14.8244 5.63908L4.67737 15.7862C4.37455 16.089 4.14007 16.4532 3.9897 16.8541ZM16.2386 4.22486L17.6224 2.84111C17.8705 2.59298 18.2009 2.43512 18.5471 2.4925C19.0338 2.57318 19.7785 2.81495 20.4813 3.51776C21.1841 4.22056 21.4259 4.96528 21.5065 5.45198C21.5639 5.79816 21.4061 6.12852 21.1579 6.37664L19.7742 7.7604C19.7742 7.7604 19.4206 6.69974 18.36 5.63908C17.2993 4.57842 16.2386 4.22486 16.2386 4.22486Z"
                  fill="#F2F2F3"
                />
              </svg>
            </i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
