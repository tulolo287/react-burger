import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect } from "react";
import { API_URL } from "../../utils/consts";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const data = useSelector((state) => state.ingredientsReducer.data);
  const fetchError = useSelector(
    (state) => state.ingredientsReducer.fetchError,
  );
  const isLoading = useSelector((state) => state.ingredientsReducer.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getIngredients());
    };

    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        {data && (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        )}
      </main>
      {fetchError && "Sorry server error"}
      {isLoading && "Loading..."}
    </div>
  );
}

export default App;
