import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { actions, initialState, reducer } from "../../services/reducer";
import { API_URL } from "../../utils/consts";
import { getIngredients } from "../../services/actions/ingredients";

export const DataContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      getIngredients(`${API_URL}/ingredients`)(dispatch);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        {state.data.length && (
          <DataContext.Provider value={[state, dispatch]}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DataContext.Provider>
        )}
      </main>
      {state.fetchError && "Sorry server error"}
      {state.isLoading && "Loading..."}
    </div>
  );
}

export default App;
