import React, { useCallback, useEffect } from "react";
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
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuth) {
      dispatch(getUser());
    }
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

  //return <Navigate to={location?.state?.from || '/'} />;

  return (
    <>
      {isAuth && <Navigate to={location?.state?.from || "/"} />}

      <section className={styles.content}>
        <div className={styles.title}>Вход</div>
        <div className={styles.form}>
          <form className={styles.form} onSubmit={onLogin}>
            <EmailInput
              name={"email"}
              placeholder="Логин"
              isIcon={false}
              extraClass="mb-2"
            />
            <div className={styles.input}>
              <PasswordInput
               name={"password"} icon="ShowIcon" />
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
