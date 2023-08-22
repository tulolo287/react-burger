import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useState } from "react";
import styles from "./burger-constructor.module.css";
import { ingredients } from "../../utils/consts";
import OrderDetails from "../order-details/order-details";
import { actions } from "../../services/actions";
import { postOrder } from "../../services/actions/order-details";
import Modal from "../modal/modal";
import useModal from "../../hooks/useModal";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const bun = useSelector((state) => state.constructorReducer.bun);
  const constructorIngredients = useSelector(
    (state) => state.constructorReducer.constructorIngredients,
  );
  const [disableOrder, setDisableOrder] = useState(true);
  const { isModal, openModal, closeModal } = useModal();

  const totalOrderPrice = useMemo(() => {
    constructorIngredients[1] ? setDisableOrder(false) : setDisableOrder(true);
    return constructorIngredients.reduce(
      (val, acc) => (val += acc.qty * acc.price),
      0,
    );
  }, [constructorIngredients]);

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
        type: actions.ADD_BUN_TO_CONSTRUCTOR,
        payload: { ...item, key: uuidv4() },
      });
    } else {
      dispatch({
        type: actions.ADD_INGREDIENT_TO_CONSTRUCTOR,
        payload: { ...item, key: uuidv4() },
      });
      dispatch({
        type: actions.INCREASE_INGREDIET_QTY,
        payload: item,
      });
    }
  };

  const makeOrder = async () => {
    const ingredientsId = constructorIngredients.map((item) => item._id);

    const request = {
      ingredients: ingredientsId,
    };
    openModal();
    dispatch(postOrder(request));
  };

  return (
    <>
      <section className={styles.burgerConsructor + " mt-25 ml-10"}>
        <div
          ref={dropTarget}
          style={{ borderColor }}
          className={styles.burgerConsructor_drop}
        >
          <ul>
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
            {constructorIngredients?.map((item, idx) =>
              item.type !== "bun" ? (
                <BurgerConstructorItem key={item.key} item={item} idx={idx} />
              ) : null,
            )}
          </ul>
          <ul>
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
          <p className="text text_type_digits-medium mr-2">{totalOrderPrice}</p>
          <i className="mr-10">
            <CurrencyIcon style={{ width: 33 }} type="primary" />
          </i>
          <Button
            disabled={disableOrder}
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
        <Modal closeModal={closeModal} height={718}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  ingredients,
};

export default BurgerConstructor;
