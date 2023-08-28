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
import { logout, updateUser } from "../../services/actions/auth";

const Profile = () => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector((state) => state.authReducer.user);
  const [userState, setUserState] = useState(user);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [saveButton, setSaveButton] = useState(false);

  const [value, setValue] = useState("password");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onIconClick = () => {
    setTimeout(() => nameRef.current.focus(), 0);
    //alert('Icon Click Callback')
  };

  useEffect(() => {
    if (!isAuth) {
      dispatch(getUser());
    }
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    let data;
    passwordRef.current?.value
      ? (data = {
          name: userState.name,
          email: userState.email,
          password: passwordRef.current?.value,
        })
      : (data = {
          name: userState.name,
          email: userState.email,
        });
    dispatch(updateUser(data));
  });

  const onLogout = () => {
    dispatch(logout()).then((res) => console.log(res));
  };

  useEffect(() => {
    setUserState(user);
  }, [user.name]);

  const onCancel = () => {
    setUserState(user);
    setSaveButton(false);
  };

  const onInputChange = () => {
    setUserState({
      ...userState,
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    });
    setSaveButton(true);
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
          <div className={styles.input}>
            <Input
              type={"text"}
              placeholder={"Name"}
              onChange={onInputChange}
              icon={"EditIcon"}
              value={userState.name}
              name={"name"}
              error={false}
              ref={nameRef}
              onIconClick={onIconClick}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
            />
          </div>
          <div className={styles.input}>
            <EmailInput
              onChange={onInputChange}
              value={userState.email}
              ref={emailRef}
              name={"email"}
              placeholder="Логин"
              isIcon={true}
              extraClass="mb-2"
            />
          </div>
          <div className={styles.input}>
            <PasswordInput
              onChange={onInputChange}
              ref={passwordRef}
              name={"password"}
              icon="EditIcon"
            />
          </div>
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
