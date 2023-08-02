import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header>
      <nav className={styles.appHeader_nav}>
        <ul className={styles.appHeader_nav__constructor}>
          <ul>
            <li>
              <a href="#">
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
              </a>
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
              <a href="#">
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
              </a>
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
