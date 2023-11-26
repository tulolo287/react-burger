import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import { getUser } from "../../services/actions/auth";
import { clearOrder } from "../../services/actions/constructor";
import {
  clearQty,
  getIngredientsSelector,
} from "../../services/actions/ingredients";
import { postOrder } from "../../services/actions/order-details";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { AppDispatch } from "../../services/types";
import { TIngredient } from "../../utils/types";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import EmptyConstructorElement from "../empty-constructor-element/empty-constructor-element";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor-mobile.module.css";
import { useIsMobile } from "../../hooks/useIsMobile";

const BurgerConstructorMobile = () => {
  var { isMobile } = useIsMobile();
  const bun = useAppSelector((state) => state.constructorReducer.bun);
  const dispatch: AppDispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);
  const navigate = useNavigate();
  const ingredients = useAppSelector(getIngredientsSelector);

  const constructorIngredients = useAppSelector(
    (state) => state.constructorReducer.constructorIngredients
  );

  const [disableOrder, setDisableOrder] = useState<boolean>(true);
  const { isModal, openModal, closeModal } = useModal();

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

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  const makeOrder = async () => {
    if (!user) {
      navigate("/login", { state: { from: "/" } });
      return;
    }
    const ingredientsId = constructorIngredients.map((item) => item._id);
    ingredientsId.unshift(bun?._id || "");
    ingredientsId.unshift(bun?._id || "");

    const request = {
      ingredients: ingredientsId,
    };
    openModal();
    dispatch(postOrder(request));
    dispatch(clearQty());
    dispatch(clearOrder());
  };

  return (
    <>
    {!isMobile && <Navigate to="/"/>}
      {ingredients && (
        <section className={styles.burgerConstructor + " mt-25 ml-10"}>
          <div
            data-cy="constructor_container"
            className={styles.burgerConstructor_drop}
          >
            <ul>
              {!bun ? (
                <EmptyConstructorElement
                  type={{ style: "top", name: "Перетащите сюда булку" }}
                />
              ) : (
                <li>
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun?.name} (верх)`}
                    price={bun?.price || 0}
                    thumbnail={bun?.image || ""}
                  />
                </li>
              )}
            </ul>
            <ul className={styles.burgerConstructor_group}>
              {constructorIngredients.length === 0 ? (
                <EmptyConstructorElement
                  type={{ style: "", name: "Перетащите сюда ингредиенты" }}
                />
              ) : (
                constructorIngredients?.map((item, idx: number) =>
                  item.type !== "bun" ? (
                    <BurgerConstructorItem
                      key={item.key}
                      item={item}
                      idx={idx}
                    />
                  ) : null
                )
              )}
            </ul>
            <ul>
              {!bun ? (
                <EmptyConstructorElement
                  type={{ style: "bottom", name: "Перетащите сюда булку " }}
                />
              ) : (
                <li>
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun?.name} (низ)`}
                    price={bun?.price || 0}
                    thumbnail={bun?.image || ""}
                  />
                </li>
              )}
            </ul>
          </div>
          <div className={styles.burgerConstructor_checkout + " mt-10"}>
            <p
              className="text text_type_digits-medium mr-2"
              data-cy="burger_price"
            >
              {totalOrderPrice}
            </p>
            <i className="mr-10">
              <CurrencyIcon type="primary" />
            </i>
            <Button
              disabled={disableOrder}
              onClick={makeOrder}
              htmlType="button"
              type="primary"
              size="large"
              data-cy="make_order"
            >
              Оформить заказ
            </Button>
          </div>
        </section>
      )}

      {isModal && (
        <Modal title={null} closeModal={closeModal} height={718}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructorMobile;
