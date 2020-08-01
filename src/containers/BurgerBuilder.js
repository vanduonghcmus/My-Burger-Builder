import React, { Component } from 'react';

import Aux from '../hoc/Auxiliary';
import BurgerIngredient from '../Burger/Burger';
import BuildControls from '../Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	// constructor(props){
	// 	super(props),

	// }

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchasable: false,
	};

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		this.setState({ purchasable: sum >= 0 });
	}

	addIngredientHandler = (type) => {
		// Up date Ingredient
		const oldCount = this.state.ingredients[type]; // return value of type (ex: salad: 0)
		const updateCount = oldCount + 1; // update count
		const updateIngredients = {
			...this.state.ingredients,
		}; // create new ingredients to update
		updateIngredients[type] = updateCount; // update new ingredient

		// Update Price
		const priceAddition = INGREDIENT_PRICE[type]; // Lấy price htai theo type
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({
			ingredients: updateIngredients,
			totalPrice: newPrice,
		});

		this.updatePurchaseState(updateIngredients);
	};

	removeIngerdientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updateCount = oldCount - 1;
		const updateIngredients = { ...this.state.ingredients };
		updateIngredients[type] = updateCount;

		const priceDeduction = INGREDIENT_PRICE[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		this.setState({ ingredients: updateIngredients, totalPrice: newPrice });

		this.updatePurchaseState(updateIngredients);
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		//{salad: true, meat:false, ...}
		return (
			<Aux>
				<BurgerIngredient ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngerdientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
