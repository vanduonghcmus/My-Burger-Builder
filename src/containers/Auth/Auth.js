import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./Auth.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import * as action from "../../store/action/index";
import { updatedObject, checkValidity } from "../../shared/Utility";

const Auth = (props) => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: false,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignup, setIsSignup] = useState(false);

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updatedObject(authForm, {
      [controlName]: updatedObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true,
      }),
    });
    setAuthForm(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignup);
  };

  const switchAuthModeHandle = () => {
    setIsSignup((prevState) => !prevState);
  };

  const formElementArray = [];
  for (let key in authForm) {
    formElementArray.push({
      id: key,
      config: authForm[key],
    });
  }
  let form = formElementArray.map((formElement) => (
    <Input
      key={formElement.id}
      changed={(event) => inputChangedHandler(event, formElement.id)}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      value={formElement.value}
    />
  ));
  if (props.loading) {
    form = <Spinner />;
  }
  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={styles.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button clicked={switchAuthModeHandle} btnType="Danger">
        SWITCH TO {isSignup ? "SIGN IN" : "SIGN UP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirect,
    buildingBurger: state.burgerBuilder.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(action.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(action.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
