import React, { Component } from 'react';

import styles from './Layout.module.css';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SlideDrawer from '../Navigation/SlideDrawer/SlideDrawer';

class Layout extends Component {
	state = {
		showSlideDrawer: false,
	};

	slideDrawerClosedHandler = () => {
		this.setState({ showSlideDrawer: false });
	};

	slideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return { showSlideDrawer: !prevState.showSlideDrawer };
		});
	};

	render() {
		return (
			<Aux>
				<Toolbar drawerToggleClicked={this.slideDrawerToggleHandler} />
				<SlideDrawer
					open={this.state.showSlideDrawer}
					closed={this.slideDrawerClosedHandler}
				/>
				<main className={styles.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
