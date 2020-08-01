import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Meat', type: 'meat' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Bacon', type: 'bacon' },
];

const buildControl = () => {
	return (
		<div className={styles.BuildControls}>
			{controls.map((crtl) => {
				return <BuildControl key={crtl.label} label={crtl.label} />;
			})}
		</div>
	);
};

export default buildControl;
