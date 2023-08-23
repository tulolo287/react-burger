import React from "react";
import styles from "./constructor.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useEffect } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";

const Constructor = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (state) => state.ingredientsReducer.ingredients,
  );
  const fetchError = useSelector(
    (state) => state.ingredientsReducer.fetchError,
  );
  const isLoading = useSelector((state) => state.ingredientsReducer.isLoading);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getIngredients());
    };

    fetchData();
  }, []);
  return (
    <>
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
    </>
  );
};

export default Constructor;
