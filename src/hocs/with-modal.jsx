import React, { createRef, useEffect, useState } from "react";
import Modal from "../components/modal/modal";

const withModal = (item) => (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.onButtonClick = this.onButtonClick.bind(this);
      this.state = {
        isToggled: this.props.isToggled,
      };
    }

    onButtonClick() {
      this.setState({
        isToggled: !this.state.isToggled,
      });
    }
    componentDidMount() {}

    render() {
      return (
        <Modal isModal={this.state.isToggled} modalHandler={this.onButtonClick}>
          <WrappedComponent item={item} />
        </Modal>
      );
    }
  };
};

export default withModal;
