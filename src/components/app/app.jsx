import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect, useRef, useState } from "react";
import { URL } from "../../utils/consts";
import Modal from "../modal/modal";
import useModal from "../../hooks/useModal";

function App() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [details, setDetails] = useState();
  const { isModal, modalHandler } = useModal();

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

  const onItemClick = (detail) => {
    modalHandler(true);
    setDetails(detail);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        {!data && !error && "Loading..."}
        {error && "Sorry server error"}
        {data && !error && (
          <>
            <BurgerIngredients data={data} onItemClick={onItemClick} />
            <BurgerConstructor data={data} onItemClick={onItemClick} />
          </>
        )}
      </main>

      <Modal isModal={isModal} modalHandler={modalHandler}>
        {details}
      </Modal>
    </div>
  );
}

export default App;
