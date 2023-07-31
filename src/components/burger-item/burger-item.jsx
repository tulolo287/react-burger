import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

const BurgerItem = ({ item }) => {
  const [count, setCount] = React.useState(1);
  return (
    <li className="burgerItem">
      {count && <Counter count={count} size="default" extraClass="m-1" />}

      <img src={item.image_large} />
      <div>
        <p className="text text_type_digits-default">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      {item.name}
    </li>
  );
};

export default BurgerItem;
