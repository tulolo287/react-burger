import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import styles from "./burger-constructor.module.css";
import { dataTypes } from "../../utils/consts";

const BurgerConstructor = ({ data }) => {
  const [bun, setBuns] = useState({});
  const [inside, setInside] = useState([]);

  useEffect(() => {
    const bun = data.find((item) => item.type === "bun");
    setBuns(bun);
    const inside = data.filter((item) => item.type !== "bun");
    setInside(inside);
  }, []);

  return (
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
        {inside.map((item) => {
          return (
            <li key={item.id} className={styles.burgerConstructor_item_move}>
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

BurgerConstructor.defaultProps = dataTypes;

export default BurgerConstructor;
