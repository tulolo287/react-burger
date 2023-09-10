import React from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getUser, logout, updateUser } from "../../services/actions/auth";
import styles from "./profile.module.css";
import { AppDispatch, State } from "../..";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state: State) => state.authReducer.user);
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState(user.email);
  const [nameValue, setNameValue] = useState(user.name);
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
    passwordValue
      ? (data = {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
        })
      : (data = {
          name: nameValue,
          email: emailValue,
        });
    dispatch(updateUser(data)).then((res) =>
      res.success ? setSaveButton(false) : alert("Update error"),
    );
  }, []);

  const onLogout = () => {
    dispatch(logout()).then((res: Response) => {
      console.log(res);
      navigate("/");
    });
  };

  const onCancel = () => {
    setNameValue(user.name);
    setEmailValue(user.email);
    setPasswordValue("");
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
          <NavLink to="" onClick={onLogout}>Выход</NavLink>
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
            value={nameValue}
            onChange={(e) => {
              setNameValue(e.target.value);
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
            value={emailValue}
            isIcon={true}
            onChange={(e) => {
              setEmailValue(e.target.value);
              setSaveButton(true);
            }}
            placeholder="E-mail"
            
          />

          <PasswordInput
            value={passwordValue}
            onChange={(e) => {
              setPasswordValue(e.target.value);
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
