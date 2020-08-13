import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './NavigationItem.module.css';

const navigationItem = (props) => (
	<li className={styles.NavigationItem}>
		<NavLink
			to={props.link}
			exact={props.exact}
			activeClassName={styles.active}>
			{props.children}
		</NavLink>
	</li>
);

navigationItem.propTypes = {
	link: PropTypes.string,
	active: PropTypes.bool,
};

export default navigationItem;
