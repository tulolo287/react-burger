import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = ({ data }) => {
  return (
    <section className={styles.burgerConsructor + " mt-25 ml-10"}>
      <ul className={styles.burgerConsructor_group}>
        {data.map((item, idx) => {
          const type =
            idx === 0 ? "top" : idx === data.length - 1 ? "bottom" : "center";
          return (
            <li
              className={
                type === "center"
                  ? styles.burgerConstructor_item_move
                  : styles.burgerConstructor_item
              }
            >
              {type === "center" && (
                <i>
                  <DragIcon type="primary" />
                </i>
              )}
              <ConstructorElement
                type={type}
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          );
        })}
      </ul>
      <div className={styles.burgerConstructor_checkout + " mt-10"}>
        <p className="text text_type_digits-medium mr-2">610</p>
        <i className="mr-10">
          <CurrencyIcon style={{ width: 33 }} type="primary" />
        </i>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
