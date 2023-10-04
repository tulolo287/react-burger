import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../services/actions/auth";
import { AppDispatch } from "../../services/types";
import styles from "./register.module.css";

const Register = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const handleRegister = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    if (nameValue && emailValue && passwordValue) {
      dispatch(
        register({
          name: nameValue,
          email: emailValue,
          password: passwordValue,
        })
      );
    }
  };

  return (
    <section className={styles.content}>
      <div className={styles.title}>Регистрация</div>
      <div className={styles.form}>
        <form className={styles.form} onSubmit={handleRegister}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />

          <EmailInput
            name={"email"}
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="E-mail"
          />

          <PasswordInput
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            name={"password"}
            placeholder="Пароль"
            icon="ShowIcon"
          />

          <div className={styles.button}>
            <Button type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <div className={styles.actions}>
          <span className={styles.question}>Уже зарегистрированы?</span>
          <Link to="/login">
            <span className={styles.register}>Войти</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
