import React from 'react';

import styles from './Input.module.css';

const input = (props) => {
	let inputElement = null;

	switch (props.inputtype) {
		case 'input':
			inputElement = <input className={styles.InputElement} {...props} />;
			break;
		case 'textarea':
			inputElement = <textarea className={styles.InputElement} {...props} />;
			break;
		default:
			inputElement = <input className={styles.InputElement} {...props} />;
			break;
	}

	return (
		<div className={styles.Input}>
			<span className={styles.Label}>{props.label}</span>
			{inputElement}
		</div>
	);
};
export default input;
