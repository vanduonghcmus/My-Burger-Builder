import React from "react";
import PropTypes from "prop-types";

import styles from "./Modal.module.css";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../BackDrop/Backdrop";

const Modal = (props) => {
  // shouldComponentUpdate(nextProp, nextState) {
  //   return (
  //
  //   );
  // }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={styles.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translate(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

Modal.propTypes = {
  show: PropTypes.bool,
  modalClosed: PropTypes.func,
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
