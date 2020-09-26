import React, { useState } from "react";
import { connect } from "react-redux";

import styles from "./Layout.module.css";
import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SlideDrawer from "../../components/Navigation/SlideDrawer/SlideDrawer";

const Layout = (props) => {
  const [slideDrawerIsVisible, setSlideDrawerIsVisible] = useState(false);

  const slideDrawerClosedHandler = () => {
    setSlideDrawerIsVisible(false);
  };

  const slideDrawerToggleHandler = () => {
    setSlideDrawerIsVisible(!slideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={slideDrawerToggleHandler}
      />
      <SlideDrawer
        isAuth={props.isAuthenticated}
        open={slideDrawerIsVisible}
        closed={slideDrawerClosedHandler}
      />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
