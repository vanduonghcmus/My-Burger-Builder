import React, { Component } from 'react';

import Button from '../../../UI/Button/Button';
import styles from './ContactData.module.css';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		street: '',
		postal: '',
	};

	render() {
		return (
			<div className={styles.ContactData}>
				<h4>Enter your Contact Data</h4>
				<form>
					<input type="text" name="name" placeholder="Your Name" />
					<input type="text" name="email" placeholder="Your Email" />
					<input type="text" name="street" placeholder="Street" />
					<input type="text" name="postal" placeholder="Postal" />
				</form>
				<Button btnType="Success">ORDER</Button>
			</div>
		);
	}
}

export default ContactData;
