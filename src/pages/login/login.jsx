import React, { useCallback, useEffect, useState } from "react";
import styles from "./login.module.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { login, getUser } from "../../services/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  const resetPass = () => {
    navigate("/forgot-password", { state: "login" });
  };

  const onLogin = useCallback(
    (e) => {
      e.preventDefault();
      if (emailValue && passwordValue) {
        const data = {
          email: emailValue,
          password: passwordValue,
        };
        dispatch(login(data));
      }
    },
    [emailValue, passwordValue, dispatch],
  );
  alert('ll')
  if (user) {
    return
    alert('gg')
  }
  //return <Navigate to={location?.state?.from || '/'} />;
  console.log(location);
  return (
    <>
      {isLoading && "Loading..."}
      {!isLoading && !user ? (
        <section className={styles.content}>
          <div className={styles.title}>Вход</div>
          <div className={styles.form}>
            <form className={styles.form} onSubmit={onLogin}>
              <EmailInput
                name={"email"}
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="E-mail"
                isIcon={false}
              />
              <div className={styles.input}>
                <PasswordInput
                  value={passwordValue}
                  placeholder="Пароль"
                  onChange={(e) => setPasswordValue(e.target.value)}
                  name={"password"}
                  icon="ShowIcon"
                />
              </div>
              <div className={styles.button}>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </div>
            </form>
            <div className={styles.actions}>
              <div>
                <span className={styles.question}>
                  Вы — новый пользователь?
                </span>
                <Link to="/register">
                  <span className={styles.register}>Зарегистрироваться</span>
                </Link>
              </div>
              <div>
                <span className={styles.question}>Забыли пароль?</span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={resetPass}
                  className={styles.register}
                >
                  Восстановить пароль
                </span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Navigate to={location?.state?.from || "/"} />
      )}
    </>
  );
};

export default Login;
