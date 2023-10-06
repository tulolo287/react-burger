import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getUser, logout, updateUser } from "../../services/actions/auth";
import { actions } from "../../services/constants";
import { useSelector } from "../../services/hooks";
import { AppDispatch, State } from "../../services/types";
import { TUser } from "../../utils/types";
import styles from "./profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  const user: TUser = useSelector((state: State) => state.authReducer.user);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const [userInput, setUserInput] = useState<TUser>(user);
  const dispatch: AppDispatch = useDispatch();
  const { pathname } = useLocation();
  const [saveButton, setSaveButton] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, []);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")?.split(" ")[1];
    getOrders(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);
    return function () {
      dispatch({ type: actions.WS_CONNECTION_CLOSED });
    };
  }, []);

  const getOrders = async (url: string) => {
    dispatch({ type: actions.WS_CONNECTION_START, url });
  };

  const onSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      let data;
      userInput.password
        ? (data = {
            name: userInput.name,
            email: userInput.email,
            password: userInput.password,
          })
        : (data = {
            name: userInput.name,
            email: userInput.email,
          });

      dispatch(updateUser(data))
        .then((user) => {
          setSaveButton(false);
        })
        .catch((err) => alert("Update user failed"));
    },
    [userInput]
  );

  const onLogout = () => {
    dispatch(logout()).then((res: Response) => {
      console.log(res);
      navigate("/");
    });
  };

  const onCancel = () => {
    setUserInput(user);
    setSaveButton(false);
  };

  return (
    <>
      {user && (
        <section className={styles.content}>
          <div className={styles.navigation}>
            <div className={styles.navItem}>
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
              <NavLink to="" onClick={onLogout}>
                Выход
              </NavLink>
            </div>
            <div className={styles.caption}>
              В этом разделе вы можете изменить свои персональные данные
            </div>
          </div>
          <div className={styles.form}>
            <form onSubmit={onSubmit} className={styles.form}>
              <Input
                type={"text"}
                placeholder={"Имя"}
                value={userInput.name}
                onChange={(e) => {
                  setUserInput({ ...userInput, name: e.target.value });
                  setSaveButton(true);
                }}
                icon="EditIcon"
                name={"name"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />

              <EmailInput
                name={"email"}
                value={userInput.email}
                isIcon={true}
                onChange={(e) => {
                  setUserInput({ ...userInput, email: e.target.value });
                  setSaveButton(true);
                }}
                placeholder="E-mail"
              />

              <PasswordInput
                value={userInput.password || ""}
                onChange={(e) => {
                  setUserInput({ ...userInput, password: e.target.value });
                  setSaveButton(true);
                }}
                name={"password"}
                placeholder="Пароль"
                icon="EditIcon"
              />

              {saveButton && (
                <div>
                  <Button htmlType="submit" type="primary">
                    Save
                  </Button>
                  <Button htmlType="button" onClick={onCancel} type="secondary">
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </div>
        </section>
      )}
      {isLoading && "Loading..."}
    </>
  );
};

export default Profile;
