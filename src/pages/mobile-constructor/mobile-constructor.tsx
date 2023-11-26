import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import styles from "./mobile-constructor.module.css"
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { AppDispatch } from "../../services/types";
import { Link, useNavigate } from "react-router-dom";
import { getIngredientsSelector } from "../../services/actions/ingredients";
import { useMemo, useState } from "react";
import { TIngredient } from "../../utils/types";

const MobileConstructor = () => {
  const bun = useAppSelector((state) => state.constructorReducer.bun);
  const dispatch: AppDispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);
  const navigate = useNavigate();
  const ingredients = useAppSelector(getIngredientsSelector);

  const constructorIngredients = useAppSelector(
    (state) => state.constructorReducer.constructorIngredients
  );
  const [disableOrder, setDisableOrder] = useState<boolean>(true);
  
  const totalOrderPrice = useMemo(() => {
    constructorIngredients[0] && bun
      ? setDisableOrder(false)
      : setDisableOrder(true);
    let sumPrice = constructorIngredients.reduce(
      (val: number, acc: TIngredient) =>
        (val += acc.qty ? acc.qty * acc.price : 0),
      0
    );
    sumPrice += bun?.price! * 2 || 0;
    return sumPrice;
  }, [constructorIngredients, bun]);

  return (
    <div>
      <BurgerIngredients />
      <div  className={styles.info}>
        <div className={styles.price}>
          <p
            className="text text_type_digits-medium mr-2"
            data-cy="burger_price"
          >
            {totalOrderPrice}
          </p>
          <i className="mr-10">
            <CurrencyIcon type="primary" />
          </i>
        </div>
        <Link to="/mobile-constructor">
        <Button
          htmlType="button"
          type="primary"
          size="large"
          data-cy="make_order"
        >
          Смотреть заказ
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default MobileConstructor;
