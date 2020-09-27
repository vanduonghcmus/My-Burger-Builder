import React from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../../UI/Button/Button";

const OrderSummary = (props) => {
  // this could be a functional component, doesn't have to be a class-component
  // this.props.ingredients = null;
  // debugger;
  const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span>{igKey}</span>: {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}$</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button clicked={props.purchaseCancelled} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.purchaseContinued} btnType="Success">
        CONTINUE
      </Button>
    </Aux>
  );
};

OrderSummary.propTypes = {
  purchaseContinued: PropTypes.func,
  purchaseCancelled: PropTypes.func,
  price: PropTypes.number,
  ingredients: PropTypes.object,
};

export default OrderSummary;
