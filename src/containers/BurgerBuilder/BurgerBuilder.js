import React, { Component } from 'react';

import axios from '../../axios-burgerSummary';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import Burger from '../../components/Burger/Burger';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		console.log(this.props);
		axios
			.get('https://react-my-burger-57df8.firebaseio.com/ingredients.json')
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
		const queryParams = []; // khởi tạo 1 mảng để lưu ingredients
		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) +
					'=' +
					encodeURIComponent(this.state.ingredients[i]),
			);
		}
		// queyParams=["salad=value","bacon=value",...]
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString,
		});
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
		let orderSummary = null;
		let burger = this.state.error ? (
			<p>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);
		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngerdientHandler}
						disabled={disabledInfo}
						ordered={this.purchaseHandler}
						price={this.state.totalPrice}
						purchasable={this.state.purchasable}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					purchaseContinued={this.purchaseContinueHandler}
					purchaseCancelled={this.purchaseCancelHandler}
					price={this.state.totalPrice}
					ingredients={this.state.ingredients}
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
					modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
