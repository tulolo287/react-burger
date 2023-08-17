import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import styles from "./burger-constructor.module.css";
import { data } from "../../utils/consts";
import OrderDetails from "../order-details/order-details";
import { actions } from "../../services/reducer";
import { postOrder } from "../../services/actions/order-details";
import Modal from "../modal/modal";
import useModal from "../../hooks/useModal";
import { useSelector, useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { burgerIngredients, bun, totalCartPrice } = useSelector((state) => ({
    bun: state.constructorReducer.bun,
    totalCartPrice: state.constructorReducer.totalCartPrice,
    burgerIngredients: state.constructorReducer.burgerIngredients,
  }));

  const { isModal, openModal, closeModal } = useModal();

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const borderColor = isHover ? "lightgrey" : "transparent";

  const onDropHandler = (item) => {
    if (item.type === "bun") {
      dispatch({ type: actions.SET_BUN, payload: item });
      dispatch({
        type: actions.ADD_BUN_TO_BURGER,
        payload: { ...item, key: uuidv4() },
      });
    } else {
      dispatch({
        type: actions.ADD_INGREDIENT_TO_BURGER,
        payload: { ...item, key: uuidv4(), qty: 1 },
      });
      dispatch({
        type: actions.INCREASE_INGREDIET_QTY,
        payload: { ...item, qty: 1 },
      });
    }
  };

  useEffect(() => {
    dispatch({ type: actions.CALCULATE_TOTAL_ORDER });
  }, [burgerIngredients]);

  const makeOrder = async () => {
    const ingredientsId = burgerIngredients.map((item) => item._id);

    const request = {
      ingredients: ingredientsId,
    };

    await dispatch(postOrder(request));
    openModal();
  };

  return (
    <>
      <section className={styles.burgerConsructor + " mt-25 ml-10"}>
        <div
          ref={dropTarget}
          style={{ borderColor }}
          className={styles.burgerConsructor_drop}
        >
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
            {burgerIngredients?.map((item, idx) => {
              if (item.type !== "bun") {
                return (
                  <BurgerConstructorItem key={item.key} item={item} idx={idx} />
                );
              }
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
        </div>
        <div className={styles.burgerConstructor_checkout + " mt-10"}>
          <p className="text text_type_digits-medium mr-2">{totalCartPrice}</p>
          <i className="mr-10">
            <CurrencyIcon style={{ width: 33 }} type="primary" />
          </i>
          <Button
            onClick={makeOrder}
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
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  data,
};

export default BurgerConstructor;
