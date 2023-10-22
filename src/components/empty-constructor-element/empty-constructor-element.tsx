import { FC } from "react";
import styles from "./empty-constructor-element.module.css";

type TEmptyConstructorElement = {
  type: { style: string; name: string };
};
const EmptyConstructorElement: FC<TEmptyConstructorElement> = ({ type }) => {
  return (
    <li>
      <div
        className={`${styles.element} ${
          type.style === "top"
            ? styles.element_top
            : type.style === "bottom"
            ? styles.element_bottom
            : ""
        }`}
      >
        <span>{type.name}</span>
      </div>
    </li>
  );
};

export default EmptyConstructorElement;
