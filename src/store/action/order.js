import * as actionTypes from "./actionTypes";
import axios from "../../axios-burgerSummary";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

// asynchronous Action
export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/order.json", orderData)
      .then((res) => {
        console.log(orderData);
        dispatch(purchaseBurgerSuccess(res.data, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
    this.props.history.push("/");
  };
};
