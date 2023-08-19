import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const ingredients = useSelector(
    (state) => state.ingredientsReducer.ingredients,
  );
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
        {ingredients && (
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
