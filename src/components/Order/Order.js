import React from 'react';

import styles from './Order.module.css';

const Order = (props) => {
	const ingrdients = [];

	for (let ingredientName in props.ingredients) {
		ingrdients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName],
		});
		console.log(props.ingredients[ingredientName]);
	}

	const ingredientOutput = ingrdients.map((ig) => (
		<span
			style={{
				textTransform: 'capitalize',
				display: 'inline-block',
				padding: '5px',
				border: '1px solid #ccc',
				margin: '0px 8px',
			}}>
			{ig.name} ({ig.amount})
		</span>
	));

	return (
		<div className={styles.Order}>
			<p>Ingredients: {ingredientOutput} </p>
			<p>
				Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default Order;
