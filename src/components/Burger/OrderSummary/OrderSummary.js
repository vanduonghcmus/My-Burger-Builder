import React, { Component } from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../../UI/Button/Button";

class OrderSummary extends Component {
  // this could be a functional component, doesn't have to be a class-component

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span>{igKey}</span>: {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the folowing ingredients: </p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}$</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.purchaseCancelled} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

OrderSummary.propTypes = {
  purchaseContinued: PropTypes.func,
  purchaseCancelled: PropTypes.func,
  price: PropTypes.number,
  ingredients: PropTypes.object,
};

export default OrderSummary;
