import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch, State } from "../..";
import useModal from "../../hooks/useModal";
import { actions } from "../../services/actions";
import { getUser } from "../../services/actions/auth";
import { postOrder } from "../../services/actions/order-details";
import { TConstructorIngredient, TIngredient } from "../../utils/types";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: State) => state.authReducer.user);
  const navigate = useNavigate();

  const constructorIngredients = useSelector(
    (state: State) => state.constructorReducer.constructorIngredients
  );
  const bun = constructorIngredients[0];
  const [disableOrder, setDisableOrder] = useState(true);
  const { isModal, openModal, closeModal } = useModal();

  const totalOrderPrice = useMemo(() => {
    constructorIngredients[1] ? setDisableOrder(false) : setDisableOrder(true);
    return constructorIngredients.reduce(
      (val: number, acc: TIngredient) => (val += acc.qty * acc.price),
      0
    );
  }, [constructorIngredients, bun]);

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: any) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const borderColor = isHover ? "lightgrey" : "transparent";

  const onDropHandler = (item: TConstructorIngredient) => {
    if (item.type === "bun") {
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
        type: actions.INCREASE_INGREDIENT_QTY,
        payload: item,
      });
    }
  };

  const makeOrder = async () => {
    if (!user) {
      navigate("/login", { state: { from: "/" } });
      return;
    }
    const ingredientsId = constructorIngredients.map(
      (item: TConstructorIngredient) => item._id
    );

    const request = {
      ingredients: ingredientsId,
    };
    openModal();
    dispatch(postOrder(request));
  };

  return (
    <>
      <section className={styles.burgerConstructor + " mt-25 ml-10"}>
        <div
          ref={dropTarget}
          style={{ borderColor }}
          className={styles.burgerConstructor_drop}
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
          <ul className={styles.burgerConstructor_group}>
            {constructorIngredients?.map(
              (item: TConstructorIngredient, idx: number) =>
                item.type !== "bun" ? (
                  <BurgerConstructorItem key={item.key} item={item} idx={idx} />
                ) : null
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
          <i style={{ width: 33 }} className="mr-10">
            <CurrencyIcon type="primary" />
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
        <Modal title={null} closeModal={closeModal} height={718}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
