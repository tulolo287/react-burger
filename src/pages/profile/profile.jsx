import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { getUser, logout, updateUser } from "../../services/actions/auth";

const Profile = () => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector((state) => state.authReducer.user);
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState(user.email);
  const [nameValue, setNameValue] = useState(user.name);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [saveButton, setSaveButton] = useState(false);


  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  const onSubmit = useCallback((e) => {
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
    dispatch(updateUser(data));
  });


  const onLogout = () => {
    dispatch(logout()).then((res) => console.log(res));
  };

  const onCancel = () => {
    setNameValue(user.name);
    setEmailValue(user.email);
    setPasswordValue(user.password);
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
          <NavLink onClick={onLogout}>Выход</NavLink>
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
            icon="EditIcon"
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
