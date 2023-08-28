import React, { useCallback, useEffect } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, getUser, resetPassword } from "../../services/actions/auth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const isPasswordReset = useSelector(
    (state) => state.authReducer.isPasswordReset,
  );

  useEffect(() => {
    if (!isAuth) {
      dispatch(getUser());
    }
  }, []);

  useEffect(() => {
    if (isAuth || location.state !== "forgot-password") {
      return navigate("/", { replace: true });
    }
  }, [isAuth, location.state]);

  const resetPasswordHandle = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get("token");
    const password = formData.get("password");
    if (token && password) {
      const data = {
        token,
        password,
      };
      dispatch(resetPassword(data))
        .then((res) =>
          res.success
            ? navigate("/login", { state: "reset-password" })
            : alert(res.message),
        )
        .catch((err) => console.log("err", err));
    }
  });

  return isLoading ? (
    "Loading..."
  ) : (
    <section className={styles.content}>
      <div className={styles.title}>Восстановление пароля</div>
      <div className={styles.form}>
        <form className={styles.form} onSubmit={resetPasswordHandle}>
          <div className={styles.input}>
            <PasswordInput
              placeholder="Введите новый пароль"
              name={"password"}
              icon="LockIcon"
            />
          </div>
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            icon={false}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          <div className={styles.button}>
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
          </div>
        </form>
        <div className={styles.actions}>
          <div>
            <span className={styles.question}>Вспомнили пароль?</span>
            <Link to="/register">
              <span className={styles.register}>Войти</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
