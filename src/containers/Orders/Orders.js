import React, { useEffect } from "react";
import axios from "../../axios-burgerSummary";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as action from "../../store/action/index";
import Spinner from "../../UI/Spinner/Spinner";

const Orders = (props) => {
  const { onFetchOrder, token, userId } = props;
  useEffect(() => {
    onFetchOrder(token, userId);
  }, [onFetchOrder, token, userId]);

  let orderLoading = <Spinner />;
  if (!props.loading) {
    orderLoading = props.order.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return <div>{orderLoading}</div>;
};

const mapStateToProps = (state) => {
  return {
    order: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: (token, userId) =>
      dispatch(action.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
