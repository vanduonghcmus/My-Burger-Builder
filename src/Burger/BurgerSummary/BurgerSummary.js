import React from 'react';

import Aux from '../../hoc/Auxiliary';

const burgerSummary = (props) => {
	const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
		return (
			<li key={igKey}>
				<span>{igKey}</span>: {props.ingredients[igKey]}
			</li>
		);
	});

	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger with the folowing ingredients: </p>
			<ul>{ingredientsSummary}</ul>
		</Aux>
	);
};

export default burgerSummary;
