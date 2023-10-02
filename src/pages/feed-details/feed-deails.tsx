import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./feed-details.module.css";

const FeedDetails = () => {
  // const ingredients: TIngredient[] = useSelector(getIngredientsSelector);
  const [order, setOrder] = useState();
  const params = useParams();
  console.log(params);

  useEffect(() => {
    //  const orderDetail = ingredients.find((item) => item._id === params.id);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>34323</h3>
      </div>
      <div className={styles.info}>
        <h2>Name</h2>
        <span>Done</span>
      </div>
      <div className={styles.ingredients}>
        <h2>Состав:</h2>
      </div>
      <div className={styles.time_price}></div>
    </div>
  );
};

export default FeedDetails;
