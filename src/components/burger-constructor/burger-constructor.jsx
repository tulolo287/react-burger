import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext, useEffect, useReducer, useState } from "react";
import styles from "./burger-constructor.module.css";
import { DATA_TYPES, DATA_ITEM, data } from "../../utils/consts";
import OrderDetails from "../order-details/order-details";
import { DataContext, actions } from "../app/app";

const BurgerConstructor = ({ onItemClick, setModalHeader }) => {
  const [state, dispatch] = useContext(DataContext);

  const [bun, setBuns] = useState({});
  const [inside, setInside] = useState([]);

  useEffect(() => {
    const bun = state.data.find((item) => item.type === "bun");
    setBuns(bun);
    const inside = state.data.filter((item) => item.type !== "bun");
    setInside(inside);
  }, []);

  useEffect(() => {
    console.log(state);
    if (state.cart.length) {
      dispatch({ type: actions.CALCULATE_TOTAL_CART });
    }
  }, [state.cart]);

  const buttonHandler = () => {
    setModalHeader(null);
    onItemClick(<OrderDetails />);
  };

  return (
    <>
      <section className={styles.burgerConsructor + " mt-25 ml-10"}>
        <ul className={styles.burgerConsructor_top}>
          <li>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        </ul>
        <ul className={styles.burgerConsructor_group}>
          {state.cart.length != 0 &&
            state.cart.map((item) => {
              return (
                <li
                  key={item._id}
                  className={styles.burgerConstructor_item_move}
                >
                  <i>
                    <DragIcon type="primary" />
                  </i>
                  <ConstructorElement
                    type="center"
                    isLocked={false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              );
            })}
        </ul>
        <ul className={styles.burgerConsructor_bot}>
          <li>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        </ul>
        <div className={styles.burgerConstructor_checkout + " mt-10"}>
          <p className="text text_type_digits-medium mr-2">
            {state.totalCartPrice}
          </p>
          <i className="mr-10">
            <CurrencyIcon style={{ width: 33 }} type="primary" />
          </i>
          <Button
            onClick={buttonHandler}
            htmlType="button"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};

BurgerConstructor.propTypes = {
  data,
};

export default BurgerConstructor;
