import React, { Component } from "react";
import axios from "../../axios-burgerSummary";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as action from "../../store/action/index";
import Spinner from "../../UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrder(this.props.token);
  }

  render() {
    let orderLoading = <Spinner />;
    if (!this.props.loading) {
      orderLoading = this.props.order.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orderLoading}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (token) => dispatch(action.fetchOrders(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
