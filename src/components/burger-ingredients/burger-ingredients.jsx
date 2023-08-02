import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef } from 'react';
import BurgerItem from '../burger-item/burger-item';
import styles from './burger-ingredients.module.css';
import { dataTypes } from '../../utils/consts';
import withModal from '../hocs/with-modal';
import OrderDetails from '../order-details/order-details';

const Types = {
  bun: { name: 'Булки' },
  sauce: { name: 'Соусы' },
  main: { name: 'Начинки' },
};

const BurgerItemWithModal = withModal(OrderDetails)(BurgerItem);

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState('bun');
  const [types, setTypes] = React.useState([]);
  const [sortedData, setSortedData] = React.useState([]);

  let categoryRefs = [];

  React.useEffect(() => {
    getTypes();
    sortData();
    getTypesNames();
  }, []);

  const sortOrder = ['bun', 'sauce', 'main'];

  let typesData = [];

  const sortData = () => {
    const sortedData2 = data.sort((a, b) => {
      return sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type);
    });
    setSortedData(sortedData2);
  };

  const getTypesNames = () => {
    let bunItems = [];
    bunItems = data.filter((item) => item.type === 'bun');

    let sauceItems = [];
    sauceItems = data.filter((item) => item.type === 'sauce');

    let mainItems = [];
    mainItems = data.filter((item) => item.type === 'main');

    typesData = [
      { category: 'Булки', items: [...bunItems] },
      { category: 'Соусы', items: [...sauceItems] },
      { category: 'Начинки', items: [...mainItems] },
    ];
    setSortedData(typesData);
    // console.log(typesData)
  };

  React.useEffect(() => {
    if (categoryRefs) {
      let scrollable;
      switch (current) {
        case 'bun':
          scrollable = categoryRefs[0];
          break;
        case 'sauce':
          scrollable = categoryRefs[1];
          break;
        case 'main':
          scrollable = categoryRefs[2];
          break;
      }
      scrollable.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [current]);

  const getTypes = () => {
    let types = [];
    data
      .map((item) => item.type)
      .filter((val, idx, arr) => {
        if (arr.indexOf(val) === idx) {
          types.push({ type: val, name: Types[val].name });
        }
      });
    setTypes(types);
  };

  const getCurrentTabItems = () => {
    return data.filter((item) => item.type === current);
  };

  return (
    <section className={styles.burgerIngredients}>
      <h1
        className={
          styles.burgerIngredients_header +
          ' text text_type_main-large mt-10 mb-5'
        }
      >
        Соберите бургер
      </h1>
      <div className={styles.burgerIngredients_tab}>
        {types.map((item, idx) => (
          <React.Fragment key={idx}>
            <Tab
              value="bun"
              active={current === item.type}
              onClick={() => setCurrent(item.type)}
            >
              {item.name}
            </Tab>
          </React.Fragment>
        ))}
      </div>
      <ul className={styles.burgerItems + ' mt-10 pr-5'}>
        {sortedData.map((types, idx) => {
          return (
            <React.Fragment key={`${types.category}_${idx}`}>
              <li className={styles.burgerItems_category + ' mb-6 mt-10'}>
                <h3
                  ref={(ref) => (categoryRefs[idx] = ref)}
                  id={types.category}
                >
                  {types.category}
                </h3>
              </li>
              {types.items.map((item) => {
                return <BurgerItemWithModal key={item.id} item={item} />;
              })}
            </React.Fragment>
          );
        })}
      </ul>
    </section>
  );
};

BurgerIngredients.defaultProps = dataTypes;

export default BurgerIngredients;
