import React, { Component } from 'react';

import Button from '../../../UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-burgerSummary';
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';

class ContactData extends Component {
	state = {
		orderForms: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIPCODE',
				},
				value: '',
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
			},

			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Maill',
				},
				value: '',
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{
							value: 'Fastest',
							displayValue: 'Fastest',
						},
						{
							value: 'Cheapest',
							displayValue: 'Cheapest',
						},
					],
				},
				value: '',
			},
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
		};
		axios
			.post('/order.json', order)
			.then((res) => this.setState({ loading: false }))
			.catch((err) => this.setState({ loading: false })); // this.setState({ loading: true });
		this.props.history.push('/');
	};

	render() {
		const inputElementArray = [];
		for (let key in this.state.orderForms) {
			inputElementArray.push({
				id: key,
				config: this.state.orderForms[key],
			});
		}

		let form = (
			<form>
				{inputElementArray.map((inputElement) => (
					<Input
						key={inputElement.id}
						elementType={inputElement.config.elementType}
						elementConfig={inputElement.config.elementConfig}
						value={inputElement.value}
					/>
				))}
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
