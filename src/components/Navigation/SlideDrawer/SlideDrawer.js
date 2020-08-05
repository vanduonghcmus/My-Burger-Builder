import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SlideDrawer.module.css';

const slideDrawer = (props) => {
	return (
		<div className={styles.SlideDrawer}>
			<div className={styles.Logo}>
				<Logo />
			</div>

			<nav>
				<NavigationItems />
			</nav>
		</div>
	);
};

export default slideDrawer;
