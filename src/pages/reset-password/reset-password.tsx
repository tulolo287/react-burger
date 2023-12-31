import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUser, resetPassword } from "../../services/actions/auth";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { AppDispatch } from "../../services/types";
import { TResetPassword } from "../../utils/types";
import styles from "./reset-password.module.css";

const ResetPassword = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [tokenValue, setTokenValue] = useState("");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector((state) => state.authReducer.user);
  const isLoading = useAppSelector((state) => state.authReducer.isLoading);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  const resetPasswordHandle = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      if (tokenValue && passwordValue) {
        const data: TResetPassword = {
          token: tokenValue,
          password: passwordValue,
        };
        dispatch(resetPassword(data))
          .then((res) =>
            res.success
              ? navigate("/login", { state: { from: "reset-password" } })
              : alert(res.message)
          )
          .catch((err) => console.log("err", err));
      }
    },
    [tokenValue, passwordValue]
  );

  return (
    <>
      {isLoading && "Loading..."}
      {!user && location?.state?.from === "forgot-password" ? (
        <section className={styles.content}>
          <div className={styles.title}>Восстановление пароля</div>
          <div className={styles.form}>
            <form className={styles.form} onSubmit={resetPasswordHandle}>
              <div className={styles.input}>
                <PasswordInput
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  name={"password"}
                  placeholder="Введите новый пароль"
                  icon="ShowIcon"
                />
              </div>
              <Input
                type={"text"}
                onChange={(e) => setTokenValue(e.target.value)}
                value={tokenValue}
                placeholder={"Введите код из письма"}
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
      ) : (
        <Navigate to={location?.state?.from || "/"} />
      )}
    </>
  );
};

export default ResetPassword;
