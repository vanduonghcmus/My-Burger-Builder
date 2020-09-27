import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as action from "../../../store/action/index";

const Logout = (props) => {
  useEffect(() => {
    props.onLogout();
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(action.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
