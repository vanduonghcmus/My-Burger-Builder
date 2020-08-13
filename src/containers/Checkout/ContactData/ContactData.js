import React, { Component } from 'react';

import Button from '../../../UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-burgerSummary';
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postal: '',
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Duong Nguyen',
				address: {
					street: 'HCMStreet 1',
					zipcode: '123456',
					country: 'Viet Nam',
				},
				email: 'test@test.com.vn',
			},
			deliveryMethod: 'fastest',
		};
		axios
			.post('/order.json', order)
			.then((res) => this.setState({ loading: false }))
			.catch((err) => this.setState({ loading: false })); // this.setState({ loading: true });
		this.props.history.push('/');
	};

	render() {
		let form = (
			<form>
				<Input inputtype="text" name="name" placeholder="Your Name" />
				<Input inputtype="text" name="email" placeholder="Your Email" />
				<Input inputtype="text" name="street" placeholder="Street" />
				<Input inputtype="text" name="postal" placeholder="Postal" />
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
			<div className={styles.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
