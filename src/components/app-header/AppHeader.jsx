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
        <div className={styles.appHeader_nav__constructor}>
          <a href="#">
            <i>
              <BurgerIcon type="primary" />
            </i>
           <span className="primary">Constructor</span> 
          </a>
          <a href="#">
            <i className="p-2">
              <ListIcon type="secondary" />
            </i>
            List
          </a>
        </div>
        <div>
          <a href="#">
            <i>
              <Logo />
            </i>
          </a>
        </div>
        <div className={styles.appHeader_nav__profile}>
          <a href="#">
            <i>
              <ProfileIcon type="secondary" />
            </i>
            Profile
          </a>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
