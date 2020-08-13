import React, { Component } from 'react';
import axios from '../../axios-burgerSummary';

import Order from '../../components/Order/Order';
import withErrorHnadler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
	state = {
		order: [],
		loading: true,
	};

	componentDidMount() {
		axios
			.get('/order.json')
			.then((res) => {
				const orderData = [];
				for (let key in res.data) {
					orderData.push({
						...res.data[key],
						id: key,
					});
				}
				this.setState({ loading: false, order: orderData });
			})
			.catch((err) => {
				this.setState({ loading: false });
			});
	}

	render() {
		return (
			<div>
				{this.state.order.map((order) => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}
					/>
				))}
			</div>
		);
	}
}

export default withErrorHnadler(Orders, axios);
