import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Meat', type: 'meat' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Bacon', type: 'bacon' },
];

const buildControl = (props) => {
	return (
		<div className={styles.BuildControls}>
			<p>
				Current Price: <strong>{props.price.toFixed(2)}</strong>$
			</p>
			{controls.map((crtl) => {
				return (
					<BuildControl
						key={crtl.label}
						label={crtl.label}
						added={() => props.ingredientAdded(crtl.type)}
						removed={() => props.ingredientRemoved(crtl.type)}
						disabled={props.disabled[crtl.type]}
					/>
				);
			})}
			<button
				onClick={props.ordered}
				disabled={!props.purchasable}
				className={styles.OrderButton}>
				ORRDER NOW
			</button>
		</div>
	);
};

export default buildControl;
