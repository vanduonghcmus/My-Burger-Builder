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
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
				validation: {
					required: false,
				},
				valid: false,
				touched: false,
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIPCODE',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				validation: {
					required: false,
				},
				valid: false,
				touched: false,
			},

			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Maill',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
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
				validation: {},
				valid: true,
				value: '',
			},
		},
		formIsValid: false,
		loading: false,
	};

	componentDidMount() {
		console.log(this.state.orderForms);
	}

	orderHandler = (event) => {
		event.preventDefault(); // để không load lại page
		this.setState({ loading: true });

		const formData = {};
		for (let formElementIndentify in this.state.orderForms) {
			formData[formElementIndentify] = this.state.orderForms[
				formElementIndentify
			].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		};
		axios
			.post('/order.json', order)
			.then((res) => this.setState({ loading: false }))
			.catch((err) => this.setState({ loading: false })); // this.setState({ loading: true });
		this.props.history.push('/');
	};

	checkValidity = (value, rules) => {
		let isValid = true;

		if (!rules) {
			return true;
		}
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		return isValid;
	};

	inputChangeHandler = (event, inputIdentify) => {
		const updateOrderForm = {
			...this.state.orderForms,
		};
		const updateFormElement = {
			...updateOrderForm[inputIdentify],
		};
		updateFormElement.value = event.target.value;
		updateFormElement.valid = this.checkValidity(
			updateFormElement.value,
			updateFormElement.validation,
		);
		updateFormElement.touched = true;
		updateOrderForm[inputIdentify] = updateFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updateOrderForm) {
			formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
			/* valid: true && formIsValid= true => true;
				 valid: true && formIsValid= true => true; */
		}
		console.log(formIsValid);
		this.setState({ orderForms: updateOrderForm, formIsValid: formIsValid });
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
			<form onSubmit={this.orderHandler}>
				{inputElementArray.map((inputElement) => (
					<Input
						key={inputElement.id}
						changed={(event) => this.inputChangeHandler(event, inputElement.id)}
						elementType={inputElement.config.elementType}
						elementConfig={inputElement.config.elementConfig}
						invalid={!inputElement.config.valid}
						shouldValidate={inputElement.config.validation}
						touched={inputElement.config.touched}
						value={inputElement.value}
					/>
				))}
				<Button
					btnType="Success"
					clicked={this.orderHandler}
					disabled={!this.state.formIsValid}>
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
