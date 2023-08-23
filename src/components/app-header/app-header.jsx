import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link, NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header>
      <nav className={styles.appHeader_nav}>
        <ul className={styles.appHeader_nav__constructor}>
          <ul>
            <li>
              <NavLink to="/">
                <i>
                  <BurgerIcon type="primary" />
                </i>
                <span
                  className={
                    styles.primaryColor +
                    " primary ml-2 text text_type_main-default"
                  }
                >
                  Конструктор
                </span>
              </NavLink>
            </li>
            <li>
              <a href="#">
                <i className="p-2">
                  <ListIcon type="secondary" />
                </i>
                <span
                  className={
                    styles.secondaryColor + " text text_type_main-default"
                  }
                >
                  Лента заказов
                </span>
              </a>
            </li>
          </ul>
          <li>
            <a href="#">
              <i className="p-2">
                <Logo />
              </i>
            </a>
          </li>
          <ul>
            <li>
              <NavLink to="/login">
                <i className="p-2">
                  <ProfileIcon type="secondary" />
                </i>
                <span
                  className={
                    styles.secondaryColor + " text text_type_main-default"
                  }
                >
                  Личный кабинет
                </span>
              </NavLink>
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
