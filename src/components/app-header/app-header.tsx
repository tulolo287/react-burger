import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/actions/auth";
import { useAppDispatch } from "../../services/hooks";
import styles from "./app-header.module.css";
import { useIsMobile } from "../../hooks/useIsMobile";

const AppHeader = () => {
  const { pathname } = useLocation();
  var [isActive, setIsActive] = useState(false);
  var [isProfileInfo, setIsProfileInfo] = useState(false);
  var {isMobile} = useIsMobile();
  var dispatch = useAppDispatch();
  var navigate = useNavigate();

  var hamburgerHandle = () => {
    setIsActive(!isActive);
  };
  function profileHandle(): void {
    setIsProfileInfo(!isProfileInfo);
  }

  const onLogout = () => {
    dispatch(logout()).then((res: Response) => {
      console.log(res);
      navigate("/");
    });
  };

  return (
    <header>
      <nav className={styles.desktop}>
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
              <NavLink to="/">
                <i className="p-2">
                  <Logo />
                </i>
              </NavLink>
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
      </nav>
      <nav className={styles.mobile}>
        <ul>
          <li>
            <NavLink to="/">
              <i>
                <Logo />
              </i>
            </NavLink>
          </li>
        </ul>
        <ul
          onClick={hamburgerHandle}
          className={`${styles.hamburger} ${
            isActive ? styles.hamburgerRotate : ""
          }`}
        >
          <div></div>
        </ul>
      </nav>
      <div
        className={`${styles.mobile_nav} ${isActive ? styles.isActive : ""}`}
      >
        <ul className={styles.profile}>
          <li onClick={profileHandle}>
            <i>
              <ProfileIcon
                type={
                  pathname === "/profile" || "/profile/orders"
                    ? "primary"
                    : "secondary"
                }
              />
            </i>
            <span className={`${"ml-2 text text_type_main-default"}`}>
              Личный кабинет
            </span>
          </li>

          <ul
            className={`${styles["profile-info"]} ${
              isProfileInfo ? styles["profile-info_active"] : ""
            }`}
          >
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive && pathname === "/profile"
                    ? styles.active
                    : styles.link
                }
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/orders"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.link
                }
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <Link to="" className={styles.link} onClick={onLogout}>
                Выход
              </Link>
            </li>
          </ul>

          <li>
            <NavLink to="/">
              <i>
                <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
              </i>
              <span className={"primary ml-2 text text_type_main-default"}>
                Конструктор
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/feed">
              <i>
                <ListIcon
                  type={pathname === "/feed" ? "primary" : "secondary"}
                />
              </i>
              <span className={"ml-2 text text_type_main-default"}>
                Лента заказов
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default AppHeader;
