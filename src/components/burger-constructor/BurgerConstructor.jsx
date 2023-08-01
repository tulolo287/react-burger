import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

const BurgerConstructor = ({ data }) => {
  return (
    <section className="burgerConsructor mt-25">
      <ul className="burgerConsructor_group">
        {data.map((item, idx) => {
          const type =
            idx === 0 ? "top" : idx === data.length - 1 ? "bottom" : "center";
          return (
            <li
              className={`${
                type === "center"
                  ? "burgerConstructor_item_move"
                  : "burgerConstructor_item"
              }`}
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
      <div className="burgerConstructor_checkout mt-10">
        <p className="text text_type_digits-default">610</p>
        <i className="mr-4">
          <CurrencyIcon type="primary" />
        </i>
        <Button htmlType="button" type="primary" size="medium">
          Нажми на меня
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
