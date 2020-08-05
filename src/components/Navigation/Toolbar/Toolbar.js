import React from 'react';

import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SlideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
	<header className={styles.Toolbar}>
		<DrawerToggle clicked={props.drawerToggleClicked} />
		<div className={styles.Logo}>
			<Logo />
			<nav className={styles.DesktopOnly}>
				<NavigationItems />
			</nav>
		</div>
	</header>
);

export default toolbar;
