import { Link } from "react-router-dom";
import styles from "./register.module.css";

const Register = () => {
  const register = async (e) => {
    e.preventDefault();
    await fetch("https://norma.nomoreparties.space/api/auth/register", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email: "sdfa323f3th@test.ru",
        password: "sfd32r3dfs",
        name: "safeww5232esd",
      }),
    })
      .then((response) => response.ok && response.json())
      .then((data) =>
        localStorage.setItem("token", {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      )
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <section className={styles.content}>
        <div className={styles.title}>Registration</div>
        <div className={styles.form}>
          <form onSubmit={register}>
            <input type="text" name="email" />
            <input type="password" name="password" />
            <button type="submit">Submit</button>
          </form>
          <p>
            <Link to="/login">Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
