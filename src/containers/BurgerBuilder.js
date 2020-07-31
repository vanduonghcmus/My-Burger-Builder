import React, { Component } from 'react';

import Aux from '../hoc/Auxiliary';
import BurgerIngredient from '../Burger/Burger';

class BurgerBuilder extends Component {
	// constructor(props){
	// 	super(props),

	// }

	state = {
		ingredients: {
			salad: 1,
			bacon: 1,
			cheese: 2,
			meat: 2,
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
