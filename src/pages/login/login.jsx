import React from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const Login = () => {
  const login = async (e) => {
    e.preventDefault();
    await fetch("https://norma.nomoreparties.space/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTYyNTcxODJlMjc3MDAxYmZhYTlkZCIsImlhdCI6MTY5MjgwNDQ2NSwiZXhwIjoxNjkyODA1NjY1fQ.hbvoVQsNutytzTddOGcdQCgEsbyI29uVVWuwhmZJ6BI",
      },
      body: JSON.stringify({
        email: "sdfa323f3th@test.ru",
        password: "sfd32r3dfs",
      }),
    })
      .then((response) => response.ok && response.json())
      .then((data) => localStorage.setItem("token", "lll"))
      .catch((err) => console.log(err));
  };

  return (

      <section className={styles.content}>
        <div className={styles.title}>Вход</div>
        <div className={styles.form}>
          <form className={styles.form} onSubmit={login}>
            <input type="text" name="email" />
            <input type="password" name="password" />
            <div className={styles.button}>
              
                <Button type="primary">Submit</Button>
          
            </div>
          </form>
          <div className={styles.actions}>
            <div>
              <span className={styles.question}>Вы — новый пользователь?</span>
              <Link to="/register">
                <span className={styles.register}>Зарегистрироваться</span>
              </Link>
            </div>
            <div >
              <span className={styles.question}>Забыли пароль?</span>
              <Link to="/register">
                <span className={styles.register}>Восстановить пароль</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
 
  );
};

export default Login;

//{"success":true,"user":{"email":"sdfa323f3th@test.ru","name":"safeww5232esd"},
//"accessToken":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTYyNTcxODJlMjc3MDAxYmZhYTlkZCIsImlhdCI6MTY5MjgwNDQ2NSwiZXhwIjoxNjkyODA1NjY1fQ.hbvoVQsNutytzTddOGcdQCgEsbyI29uVVWuwhmZJ6BI",
//"refreshToken":"c30a2ef92502d9f7c6ba00a89d311c20dced0a2bd7181ab4593c8f3a870a2b8b7c7f9958eda63143"}
