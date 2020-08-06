import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SlideDrawer.module.css';
import Backdrop from '../../../UI/BackDrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const slideDrawer = (props) => {
	let attachedSlideDrawer = [styles.SlideDrawer, styles.Close];

	if (props.open) {
		attachedSlideDrawer = [styles.SlideDrawer, styles.Open];
	}

	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedSlideDrawer.join(' ')}>
				<div className={styles.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	);
};

slideDrawer.propTypes = {
	open: PropTypes.bool,
	closed: PropTypes.func,
};

export default slideDrawer;
