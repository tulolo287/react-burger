import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useModal from "../../hooks/useModal";
import { getUser } from "../../services/actions/auth";
import {
  addBuntToConstructor,
  addIngredientToConstructor,
  clearOrder,
} from "../../services/actions/constructor";
import {
  clearQty,
  increaseBunQty,
  increaseIngredientQty,
} from "../../services/actions/ingredients";
import { postOrder } from "../../services/actions/order-details";
import { useSelector } from "../../services/hooks";
import { AppDispatch, State } from "../../services/types";
import { TConstructorIngredient, TIngredient } from "../../utils/types";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import {getIngredientsSelector} from "../../services/actions/ingredients";
import Loader from "../ui/loader/loader";

const BurgerConstructor = () => {
  const [bun, setBun] = useState<TIngredient>()
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: State) => state.authReducer.user);
  const navigate = useNavigate();
  const ingredients = useSelector(getIngredientsSelector);
   const isLoading = useSelector(
    (state: State) => state.ingredientsReducer.isLoading
  );

  const constructorIngredients = useSelector(
    (state: State) => state.constructorReducer.constructorIngredients
  );

  useEffect(() => {
    console.log( constructorIngredients)
    setBun( constructorIngredients[0])
  },[ingredients, isLoading])

  const [disableOrder, setDisableOrder] = useState<boolean>(true);
  const { isModal, openModal, closeModal } = useModal();

  const totalOrderPrice = useMemo(() => {
    constructorIngredients[1] ? setDisableOrder(false) : setDisableOrder(true);
    return constructorIngredients.reduce(
      (val: number, acc: TIngredient) =>
        (val += acc.qty ? acc.qty * acc.price : 0),
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
      dispatch(addBuntToConstructor({ ...item, key: uuidv4() }));
      dispatch(increaseBunQty(item));
    } else {
      dispatch(addIngredientToConstructor({ ...item, key: uuidv4() }));
      dispatch(increaseIngredientQty(item));
    }
  };

  const makeOrder = async () => {
    if (!user) {
      navigate("/login", { state: { from: "/" } });
      return;
    }
    const ingredientsId = constructorIngredients.map((item) => item._id);
    ingredientsId.unshift(bun?._id || '');

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
     {isLoading && <Loader />}
      {ingredients && (
      <section className={styles.burgerConstructor + " mt-25 ml-10"}>
        <div
          data-cy="constructor_container"
          ref={dropTarget}
          style={{ borderColor }}
          className={styles.burgerConstructor_drop}
        >
          <ul>
            <li>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun?.name} (верх)`}
                price={bun?.price || 0}
                thumbnail={bun?.image || ''}
              />
            </li>
          </ul>
          <ul className={styles.burgerConstructor_group}>
            {constructorIngredients?.map((item, idx: number) =>
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
                text={`${bun?.name} (низ)`}
                price={bun?.price || 0}
                thumbnail={bun?.image || ''}
              />
            </li>
          </ul>
        </div>
        <div className={styles.burgerConstructor_checkout + " mt-10"}>
          <p className="text text_type_digits-medium mr-2" data-cy="burger_price">{totalOrderPrice}</p>
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
      </section>)}

      {isModal && (
        <Modal title={null} closeModal={closeModal} height={718}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
