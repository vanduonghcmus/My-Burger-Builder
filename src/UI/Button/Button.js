import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

const button = (props) => (
	<button
		onClick={props.clicked}
		disabled={props.disabled}
		className={[styles.Button, styles[props.btnType]].join(' ')}>
		{props.children}
	</button>
);

button.propTypes = {
	clicked: PropTypes.func,
	btnType: PropTypes.string,
};

export default button;
