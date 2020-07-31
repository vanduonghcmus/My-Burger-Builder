import React, { Component } from 'react';

import Aux from '../hoc/Auxiliary';
import BurgerIngredient from '../Burger/Burger';

class BurgerBuilder extends Component {
	// constructor(props){
	// 	super(props),

	// }

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
	};

	render() {
		return (
			<Aux>
				<BurgerIngredient ingredients={this.state.ingredients} />
				<div>Burger Controls</div>
			</Aux>
		);
	}
}

export default BurgerBuilder;
