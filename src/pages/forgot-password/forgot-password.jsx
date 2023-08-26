import React, { useEffect } from "react";
import styles from "./forgot-password.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { login, getUser, forgotPassword } from "../../services/actions/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const isForgotPassword = useSelector(
    (state) => state.authReducer.isForgotPassword,
  );
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const location = useLocation();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (isAuth || location.state !== "login") {
      return navigate("/", { replace: true });
    }
  }, [isAuth, location.state]);

  const forgotPass = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    if (email) {
      dispatch(forgotPassword({ email })).then(() =>
        navigate("/reset-password", { state: "forgot-password" }),
      );
    }
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <section className={styles.content}>
      <div className={styles.title}>Восстановление пароля</div>
      <div className={styles.form}>
        <form className={styles.form} onSubmit={forgotPass}>
          <input type="text" placeholder="Укажите e-mail" name="email" />
          <div className={styles.button}>
            <Button htmlType="submit" type="primary">
              Восстановить
            </Button>
          </div>
        </form>
        <div className={styles.actions}>
          <div>
            <span className={styles.question}>Вспомнили пароль?</span>
            <Link to="/login">
              <span className={styles.register}>Войти</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
