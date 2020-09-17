import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./Modal.module.css";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../BackDrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProp, nextState) {
    return (
      nextProp.show !== this.props.show ||
      nextProp.children !== this.props.children
    );
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translate(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  modalClosed: PropTypes.func,
};

export default Modal;
