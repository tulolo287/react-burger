import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getUser, login } from "../../services/actions/auth";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { AppDispatch } from "../../services/types";
import styles from "./login.module.css";

const Login = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);
  const isLoading = useAppSelector((state) => state.authReducer.isLoading);
  const navigate = useNavigate();
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(getUser());
    };
    if (!user) {
      checkAuth();
    }
  }, [user, dispatch]);

  const resetPass = () => {
    navigate("/forgot-password", { state: { from: "login" } });
  };

  const onLogin = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (emailValue && passwordValue) {
        const data = {
          email: emailValue,
          password: passwordValue,
        };
        dispatch(login(data));
      }
    },
    [emailValue, passwordValue, dispatch]
  );

  return (
    <>
      {user && !isLoading && <Navigate to="/" />}

      {!user && !isLoading && (
        <section className={styles.content}>
          <div className={styles.title}>Вход</div>
          <div className={styles.form}>
            <form className={styles.form} onSubmit={onLogin}>
              <EmailInput
                name={"email"}
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="E-mail"
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
      )}
      {isLoading && "Loading..."}
    </>
  );
};

export default Login;
