import React, { useCallback, useEffect } from "react";
import styles from "./login.module.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { login, getUser } from "../../services/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const resetPass = () => {
    navigate("/forgot-password", { state: "login" });
  };

  const onLogin = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get("email") && formData.get("password")) {
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      dispatch(login(data));
    }
  });

  return (
    <>
      {isAuth && <Navigate to={location.state || "/"} />}

      <section className={styles.content}>
        <div className={styles.title}>Вход</div>
        <div className={styles.form}>
          <form className={styles.form} onSubmit={onLogin}>
            <input type="text" placeholder="E-mail" name="email" />
            <div className={styles.input}>
              <input type="password" name="password" placeholder="Пароль" />
              <i>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4C14.0683 4 16.0293 4.71758 17.7366 6.04606C19.4439 7.36485 20.8976 9.29455 21.9415 11.7091C22.0195 11.8933 22.0195 12.1067 21.9415 12.2812C19.8537 17.1103 16.1366 20 12 20H11.9902C7.86341 20 4.14634 17.1103 2.05854 12.2812C1.98049 12.1067 1.98049 11.8933 2.05854 11.7091C4.14634 6.88 7.86341 4 11.9902 4H12ZM12 8.12121C9.8439 8.12121 8.09756 9.85697 8.09756 12C8.09756 14.1333 9.8439 15.8691 12 15.8691C14.1463 15.8691 15.8927 14.1333 15.8927 12C15.8927 9.85697 14.1463 8.12121 12 8.12121ZM12.0012 9.57362C13.3378 9.57362 14.4304 10.6597 14.4304 11.9979C14.4304 13.3264 13.3378 14.4124 12.0012 14.4124C10.6548 14.4124 9.56215 13.3264 9.56215 11.9979C9.56215 11.833 9.58166 11.6779 9.61093 11.5227H9.65971C10.7426 11.5227 11.6207 10.6694 11.6597 9.60272C11.767 9.58332 11.8841 9.57362 12.0012 9.57362Z"
                    fill="#F2F2F3"
                  />
                </svg>
              </i>
            </div>
            <div className={styles.button}>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </div>
          </form>
          <div className={styles.actions}>
            <div>
              <span className={styles.question}>Вы — новый пользователь?</span>
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
    </>
  );
};

export default Login;
