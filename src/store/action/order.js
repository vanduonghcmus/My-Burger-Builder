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
export const purchaseBurger = (token, orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/order.json?auth=" + token, orderData)
      .then((res) => {
        console.log(orderData);
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get("/order.json?auth=" + token)
      .then((res) => {
        const orderData = [];
        for (let key in res.data) {
          orderData.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(orderData));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
