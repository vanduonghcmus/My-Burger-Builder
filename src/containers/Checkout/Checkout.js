import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	state = {
		ingredients: null,
		totalPrice: 0,
	};

	componentWillMount() {
		console.log(this.props);
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;

		for (let param of query.entries()) {
			// query.entries=["salad","1"]
			if (param[0] === 'price') {
				price = param[1];
			} else {
				ingredients[param[0]] = +param[1];
			}
		}
		this.setState({ ingredients: ingredients, totalPrice: price });
	}

	checkoutCancleHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinueHandler = () => {
		this.props.history.push('/checkout/contact-data');
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancled={this.checkoutCancleHandler}
					checkoutContinued={this.checkoutContinueHandler}
				/>

				<Route
					path={this.props.match.url + '/contact-data'}
					render={(props) => (
						<ContactData
							ingredients={this.state.ingredients}
							price={this.state.totalPrice}
							{...props}
						/>
					)}
				/>
			</div>
		);
	}
}

export default Checkout;
