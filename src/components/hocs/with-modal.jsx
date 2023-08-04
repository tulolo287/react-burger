import {
  Button,
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { createRef, useEffect, useState } from 'react';
import Modal from '../modal/modal';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';

const withModal = (WrappedComponent1) => (WrappedComponent2) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.burgerItemRef = createRef();

      this.onButtonClick = this.onButtonClick.bind(this);
      this.state = {
        isToggled: this.props.initialToggleState,
      };
    }

    componentDidMount() {
      if (this.burgerItemRef && this.burgerItemRef.current) {
        this.burgerItemRef.current.addEventListener('click', this.handleClick);
      }
    }
    componentWillUnmount() {
      window.removeEventListener('click', this.handleClick);
    }

    handleClick = () => {
      this.setState({
        isToggled: !this.state.isToggled,
      });
    };

    onButtonClick() {
      this.setState({
        isToggled: !this.state.isToggled,
      });
    }

    render() {
      const { initialToggleState, ...props } = this.props;

      return (
        <>
          {this.state.isToggled &&
            createPortal(
              <>
                <ModalOverlay modalHandler={this.onButtonClick} />
                <Modal modalHandler={this.onButtonClick}><WrappedComponent1 {...props}/></Modal>
              </>,
              document.body
            )}
          <WrappedComponent2
            {...props}
            ref={this.burgerItemRef}
            onClick={this.onButtonClick}
          >
            {this.props.children}
          </WrappedComponent2>
        </>
      );
    }
  };
};

export default withModal;
