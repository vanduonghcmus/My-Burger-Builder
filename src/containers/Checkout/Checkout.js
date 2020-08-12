import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	state = {
		ingredients: {
			bacon: 1,
			cheese: 1,
			meat: 1,
			salad: 1,
		},
	};

	componentDidMount() {
		console.log(this.props);
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};

		for (let param of query.entries()) {
			// query.entries=["salad","1"]
			ingredients[param[0]] = +param[1];
			console.log(param);
		}
		this.setState({ ingredients: ingredients });
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
					component={ContactData}
				/>
			</div>
		);
	}
}

export default Checkout;
