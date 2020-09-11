import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-burgerSummary";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../UI/Spinner/Spinner";
import Burger from "../../components/Burger/Burger";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/action";

class BurgerBuilder extends Component {
  // constructor(props){
  // 	super(props),

  // }

  state = {
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("https://react-my-burger-57df8.firebaseio.com/ingredients.json")
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    //{salad: true, meat:false, ...}
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCancelled={this.purchaseCancelHandler}
          price={this.props.price}
          ingredients={this.props.ings}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
