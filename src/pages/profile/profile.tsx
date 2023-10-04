import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, State } from "../../services/store";
import { getUser, logout, updateUser } from "../../services/actions/auth";
import { TUser } from "../../utils/types";
import styles from "./profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  const user: TUser = useSelector((state: State) => state.authReducer.user);
  const [userInput, setUserInput] = useState<TUser>(user);
  const dispatch: AppDispatch = useDispatch();
  const { pathname } = useLocation();
  const [saveButton, setSaveButton] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, []);

  const onSubmit = useCallback((e: React.SyntheticEvent) => {
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
  }, [userInput]);

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
    <section className={styles.content}>
      <div className={styles.navigation}>
        <div className={styles.navItem}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive && pathname === "/profile" ? styles.active : styles.link
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
  );
};

export default Profile;
