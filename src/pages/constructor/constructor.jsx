import React from "react";
import styles from "./constructor.module.css";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

const Constructor = () => {
  return (
    <>
      <main className={styles.container}>
        <>
          <BurgerIngredients />
          <BurgerConstructor />
        </>
      </main>
    </>
  );
};

export default Constructor;
