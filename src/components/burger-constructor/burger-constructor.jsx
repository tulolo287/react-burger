import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import styles from "./burger-constructor.module.css";
import { DATA_TYPES, DATA_ITEM, data } from "../../utils/consts";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import useModal from "../../hooks/useModal";
import PropTypes from "prop-types";

const BurgerConstructor = ({ data }) => {
  const [bun, setBuns] = useState({});
  const [inside, setInside] = useState([]);
  const { isModal, modalHandler } = useModal();

  useEffect(() => {
    const bun = data.find((item) => item.type === "bun");
    setBuns(bun);
    const inside = data.filter((item) => item.type !== "bun");
    setInside(inside);
  }, []);

  const onItemClick = () => {
    modalHandler(true);
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
          {inside.map((item) => {
            return (
              <li key={item._id} className={styles.burgerConstructor_item_move}>
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
          <Button
            onClick={onItemClick}
            htmlType="button"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        </div>
      </section>

      <Modal modalHandler={modalHandler} isModal={isModal}>
        <OrderDetails />
      </Modal>
    </>
  );
};

BurgerConstructor.propTypes = {
  data
};

export default BurgerConstructor;
