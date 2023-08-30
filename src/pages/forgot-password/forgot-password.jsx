import React, { useCallback, useEffect, useState } from "react";
import styles from "./forgot-password.module.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { login, getUser, forgotPassword } from "../../services/actions/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState("");
  const user = useSelector((state) => state.authReducer.user);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  const forgotPasswordHandle = useCallback((e) => {
    e.preventDefault();
    if (emailValue) {
      const data = {
        email: emailValue,
      };
      dispatch(forgotPassword(data)).then(() =>
        navigate("/reset-password", { state: { from: "forgot-password" } }),
      );
    }
  });

  return (
    <>
      {isLoading && "Loading..."}
      {!user && location?.state?.from === "login" ? (
        <section className={styles.content}>
          <div className={styles.title}>Восстановление пароля</div>
          <div className={styles.form}>
            <form className={styles.form} onSubmit={forgotPasswordHandle}>
              <EmailInput
                name={"email"}
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="Укажите e-mail"
              />
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
      ) : (
        <Navigate to={location?.state?.from || "/"} />
      )}
    </>
  );
};

export default ForgotPassword;
