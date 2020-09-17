import * as actionTypes from "../action/actionTypes";
import { updatedObject } from "../Utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  purchasable: false,
  error: false,
  building: false,
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updatedObject(
    state.ingredients,
    updatedIngredient
  );
  const updateState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
    building: true,
  };
  return updatedObject(state, updateState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngs = updatedObject(state.ingredients, updatedIng);
  const updateSta = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
    building: true,
  };
  return updatedObject(state, updateSta);
};
const setIngredients = (state, action) => {
  return updatedObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    error: false,
    totalPrice: 4,
    building: false,
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updatedObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
