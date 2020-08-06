import React, { Component } from 'react';

import styles from './Layout.module.css';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SlideDrawer from '../../components/Navigation/SlideDrawer/SlideDrawer';

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
