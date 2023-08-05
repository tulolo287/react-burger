import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useState } from "react";
import { URL } from "../../utils/consts";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const { data } = await (await fetch(URL)).json();
        setData(data);
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
        {data ? (
          <>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </>
        ) : (
          "Loading..."
        )}
      </main>
    </div>
  );
}

export default App;
