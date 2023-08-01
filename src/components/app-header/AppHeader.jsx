import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./appHeader.module.css";

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
                <span className="primary">Constructor</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="p-2">
                  <ListIcon type="secondary" />
                </i>
                List
              </a>
            </li>
          </ul>

          <li>
            <a href="#">
              <i>
                <Logo />
              </i>
            </a>
          </li>
          <ul>
            <li>
              <a href="#">
                <i>
                  <ProfileIcon type="secondary" />
                </i>
                Profile
              </a>
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
