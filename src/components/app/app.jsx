import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { URL, item } from "../../utils/consts";
import Modal from "../modal/modal";
import useModal from "../../hooks/useModal";
import { actions, initialState, reducer } from "../../reducer";

export const DataContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState();
  const { isModal, openModal, closeModal, modalHeader, setModalHeader } =
    useModal();
  /* 
  useEffect(() => {
    console.log("STATE ----------------------------------- ", state);
  }, [state]); 
  */
  useEffect(() => {
    const dataFetch = async () => {
      dispatch({ type: actions.SET_LOADING, payload: true });
      try {
        const response = await fetch(URL);
        if (response.ok) {
          const { data } = await response.json();
          dispatch({ type: actions.SET_DATA_FROM_SERVER, payload: data });
          const bun = data.find((item) => item.type === "bun");
          dispatch({ type: actions.SET_BUN, payload: bun });
          dispatch({ type: actions.ADD_BUN_TO_CART, payload: bun });
          dispatch({ type: actions.SET_LOADING, payload: false });
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
    openModal();
    setDetails(detail);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        {error && "Sorry server error"}
        {state.data && !state.loading && (
          <DataContext.Provider value={[state, dispatch]}>
            <BurgerIngredients
              onItemClick={onItemClick}
              setModalHeader={setModalHeader}
            />
            <BurgerConstructor
              onItemClick={onItemClick}
              setModalHeader={setModalHeader}
            />
          </DataContext.Provider>
        )}
      </main>

      {isModal && (
        <Modal
          closeModal={closeModal}
          modalHeader={modalHeader}
          setModalHeader={setModalHeader}
        >
          {details}
        </Modal>
      )}
      {state.loading && "Loading..."}
    </div>
  );
}

export default App;
