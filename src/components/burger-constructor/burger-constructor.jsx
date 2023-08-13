import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./burger-constructor.module.css";
import { data, URL, ORDER_URL, API_URL } from "../../utils/consts";
import OrderDetails from "../order-details/order-details";
import { DataContext } from "../app/app";
import { actions } from "../../reducer";
import { postOrder } from "../../utils/api";

const BurgerConstructor = ({ onItemClick, setModalHeader }) => {
  const [state, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (state.order.length) {
      dispatch({ type: actions.CALCULATE_TOTAL_ORDER });
    }
  }, [state.order]);

  const buttonHandler = async () => {
    const ingredientsId = state.order.map((item) => item._id);

    const request = {
      ingredients: ingredientsId,
    };

    dispatch({ type: actions.SET_LOADING, payload: true });
    const data = await postOrder(request, "orders");

    if (data) {
      dispatch({ type: actions.POST_ORDER, payload: data });
      setModalHeader(null);
      onItemClick(<OrderDetails orderNumber={data} />);
      dispatch({ type: actions.SET_LOADING, payload: false });
    } else {
      dispatch({ type: actions.SET_LOADING, payload: false });
      alert("Sorry order error");
    }
    dispatch({ type: actions.CLEAR_ORDER });
  };

  return (
    <>
      <section className={styles.burgerConsructor + " mt-25 ml-10"}>
        <ul className={styles.burgerConsructor_top}>
          <li>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${state.bun.name} (верх)`}
              price={state.bun.price}
              thumbnail={state.bun.image}
            />
          </li>
        </ul>
        <ul className={styles.burgerConsructor_group}>
          {state.ingredients?.map((item) => {
            return (
              <li key={uuidv4()} className={styles.burgerConstructor_item_move}>
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
              text={`${state.bun.name} (низ)`}
              price={state.bun.price}
              thumbnail={state.bun.image}
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
