import React from "react";
import PropTypes from "prop-types";

import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}$</strong>
      </p>
      {controls.map((crtl) => {
        return (
          <BuildControl
            key={crtl.label}
            label={crtl.label}
            added={() => props.ingredientAdded(crtl.type)}
            removed={() => props.ingredientRemoved(crtl.type)}
            disabled={props.disabled[crtl.type]}
          />
        );
      })}
      <button
        onClick={props.ordered}
        disabled={!props.purchasable}
        className={styles.OrderButton}
      >
        {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
      </button>
    </div>
  );
};

buildControls.propTypes = {
  ingredientAdded: PropTypes.func,
  ingredientRemoved: PropTypes.func,
  disabled: PropTypes.object,
  ordered: PropTypes.func,
  price: PropTypes.number,
  purchasable: PropTypes.bool,
};

export default buildControls;
