import { useEffect, useState } from "react";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import MobileConstructor from "../mobile-constructor/mobile-constructor";
import { useIsMobile } from "../../hooks/useIsMobile";

const Constructor = () => {
var {isMobile} = useIsMobile()
console.log(window.innerWidth)
  return (
    <>
      {isMobile ? (
        <MobileConstructor />
      ) : (
        <>
          <BurgerIngredients />
          <BurgerConstructor />
        </>
      )}
    </>
  );
};

export default Constructor;
