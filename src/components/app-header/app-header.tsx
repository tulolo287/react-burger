import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link, NavLink, useLocation } from "react-router-dom";

const AppHeader = () => {
  const { pathname } = useLocation();

  return (
    <header>
      <nav className={styles.appHeader_nav}>
        <div className={styles.appHeader_nav__constructor}>
          <ul>
            <li>
              <NavLink to="/">
                <i>
                  <BurgerIcon
                    type={pathname === "/" ? "primary" : "secondary"}
                  />
                </i>
                <span className={"primary ml-2 text text_type_main-default"}>
                  Конструктор
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/feed">
                <i className="p-2">
                  <ListIcon
                    type={pathname === "/feed" ? "primary" : "secondary"}
                  />
                </i>
                <span className={"text text_type_main-default"}>
                  Лента заказов
                </span>
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#">
                <i className="p-2">
                  <Logo />
                </i>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink state={{ from: "/profile" }} to="/profile">
                <i className="p-2">
                  <ProfileIcon
                    type={
                      pathname === "/profile" || "/profile/orders"
                        ? "primary"
                        : "secondary"
                    }
                  />
                </i>
                <span className={"text text_type_main-default"}>
                  Личный кабинет
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
