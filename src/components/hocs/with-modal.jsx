import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import styles from "../modal/modal.module.css";
import { dataTypes } from "../../utils/consts";
import Modal from "../modal/modal";

import { createPortal } from 'react-dom';
import OrderDetails from "../order-details/order-details.jsx"



const withModal = WrappedComponent => {
  return class extends React.Component {
      constructor(props) {
          super(props);

          this.onButtonClick = this.onButtonClick.bind(this);
          this.state = {
              isToggled: this.props.initialToggleState
          };
      }

      onButtonClick() {
        console.log(this.state)
          this.setState({
              isToggled: !this.state.isToggled,
          });
      }

      render() {
          const {initialToggleState, ...props} = this.props;
          // Извлечём все необходимые пропсы.
          return (
          <>
          {this.state.isToggled &&
            createPortal(<>
              <div onClick={this.onButtonClick} className={styles.modal_bg}></div>
              <div className={styles.modal_content}><OrderDetails/></div>
              </>, 
                  document.body
                  
                  )
              }
              <WrappedComponent 
                  {...props}
                  onClick={this.onButtonClick}
                  
              >
                {this.props.children}
                </WrappedComponent>
                </>
          );
      }
  }
};

export default withModal; 