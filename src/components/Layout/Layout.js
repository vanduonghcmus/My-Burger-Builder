import React from 'react';
import styles from './Layout.module.css';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SlideDrawer from '../Navigation/SlideDrawer/SlideDrawer';

const layout = (props) => {
	return (
		<Aux>
			<Toolbar />
			<SlideDrawer />
			<main className={styles.Content}>{props.children}</main>
		</Aux>
	);
};

export default layout;
