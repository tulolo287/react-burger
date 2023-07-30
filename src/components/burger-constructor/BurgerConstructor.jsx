import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

const BurgerConstructor = ({ data }) => {
  return (
    <section className="burgerWrapper mt-25">
      <div className="burgerConsructor">
        {data.map((item, idx) => {
          const type =
            idx === 0 ? "top" : idx === data.length - 1 ? "bottom" : "center";
          return (
            <div
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
            </div>
          );
        })}
      </div>
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
