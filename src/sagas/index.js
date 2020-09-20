import { takeEvery } from "redux-saga/effects";

import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckState,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import * as actionTypes from "../store/action/actionTypes";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckState);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENT, initIngredientsSaga);
}
