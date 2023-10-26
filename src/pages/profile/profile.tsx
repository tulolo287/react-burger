import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { getUser, logout, updateUser } from "../../services/actions/auth";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { AppDispatch } from "../../services/types";
import styles from "./profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.authReducer.user);
  const isLoading = useAppSelector((state) => state.authReducer.isLoading);
  const dispatch: AppDispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [saveButton, setSaveButton] = useState(false);
  const { values, handleChange, setValues } = useForm(user);

  useEffect(() => {
    const setUser = async () => {
      if (!user) {
        dispatch(getUser()).then((user) => setValues(user!));
      }
    };

    setUser();
  }, [dispatch, setValues, user]);

  const onSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();

      dispatch(updateUser(values))
        .then((user) => {
          console.log(user)
          setSaveButton(false);
        })
        .catch((err) => alert("Update user failed"));
    },
    [dispatch, values]
  );

  const onLogout = () => {
    dispatch(logout()).then((res: Response) => {
      console.log(res);
      navigate("/");
    });
  };

  const onCancel = () => {
    setValues(user!);
    setSaveButton(false);
  };

  return (
    <>
      {values && (
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
                to="/profile/orders"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.link
                }
              >
                История заказов
              </NavLink>
            </div>
            <div className={styles.navItem}>
              <Link to="" className={styles.link} onClick={onLogout}>
                Выход
              </Link>
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
                value={values.name}
                onChange={(e) => {
                  handleChange(e);
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
                value={values.email}
                isIcon={true}
                onChange={(e) => {
                  handleChange(e);
                  setSaveButton(true);
                }}
                placeholder="E-mail"
              />

              <PasswordInput
                value={values.password || ""}
                onChange={(e) => {
                  handleChange(e);
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
