import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useRef, useState } from "react";
import { URL } from "../../utils/consts";

function App() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(URL);
        if (response.ok) {
          const { data } = await response.json();
          setData(data);
        } else {
          setError(true);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    dataFetch();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        {!data && !error && "Loading..."}
        {error && "Sorry server error"}
        {data && !error && (
          <>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
