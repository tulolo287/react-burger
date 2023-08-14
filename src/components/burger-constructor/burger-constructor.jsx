import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext, useEffect, useReducer, useState } from "react";
import styles from "./burger-constructor.module.css";
import { data } from "../../utils/consts";
import OrderDetails from "../order-details/order-details";
import { DataContext } from "../app/app";
import { actions } from "../../services/reducer";
import { postOrder } from "../../services/actions/ingredients";
import Modal from "../modal/modal";
import useModal from "../../hooks/useModal";

const BurgerConstructor = () => {
  const [state, dispatch] = useContext(DataContext);
  const { isModal, openModal, closeModal, title, setTitle } = useModal();

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

    await postOrder(request)(dispatch);
    openModal();
    
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
              <li key={item.key} className={styles.burgerConstructor_item_move}>
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

      {isModal && (
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber={state.orderNumber} />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  data,
};

export default BurgerConstructor;
