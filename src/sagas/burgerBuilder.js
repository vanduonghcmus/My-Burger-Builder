import { put } from "redux-saga/effects";

import axios from "../axios-burgerSummary";
import * as actions from "../store/action/index";

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get(
      "https://react-my-burger-57df8.firebaseio.com/ingredients.json"
    );
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    put(actions.fetchIngredientFailed());
  }
}
