import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { forwardRef } from 'react';
import styles from './burger-item.module.css';

const BurgerItem = forwardRef((props, ref) => {
  const { item, qty } = props;
  
  return (
    <li ref={ref} className={styles.burgerItem}>
      {qty && <Counter count={qty} size="default" extraClass="m-1" />}

      <img src={item.image_large} alt={item.name} />
      <div className={styles.burgerItem_price}>
        <p className="text text_type_digits-default mr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      {item.name}
    </li>
  );
});

export default BurgerItem;
