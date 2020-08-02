import React from 'react';

import styles from './Backdrop.module.css';

const backdrop = (props) =>
	props.show === true && (
		<div className={styles.Backdrop} onClick={props.clicked}></div>
	);

export default backdrop;
