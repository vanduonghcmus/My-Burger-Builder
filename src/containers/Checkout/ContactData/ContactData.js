import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "../../../UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-burgerSummary";
import Spinner from "../../../UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/action/index";
import { updatedObject, checkValidity } from "../../../shared/Utility";

const ContactData = (props) => {
  const [orderForms, setOrderForms] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: false,
      },
      valid: false,
      touched: false,
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIPCODE",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: false,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "Fastest",
            displayValue: "Fastest",
          },
          {
            value: "Cheapest",
            displayValue: "Cheapest",
          },
        ],
      },
      validation: {},
      valid: true,
      value: "fastest",
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault(); // to not reload the page
    const formData = {};
    for (let formElementIdentifier in orderForms) {
      formData[formElementIdentifier] = orderForms[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(props.token, order);
  };

  const inputChangeHandler = (event, inputIdentify) => {
    const updateFormElement = updatedObject(orderForms[inputIdentify], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForms[inputIdentify].validation
      ),
      touched: true,
    });
    const updateOrderForm = updatedObject(orderForms, {
      [inputIdentify]: updateFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updateOrderForm) {
      formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
      /* valid: true && formIsValid= true => true;
				 valid: true && formIsValid= true => true; */
    }
    setOrderForms(updateOrderForm);
    setFormIsValid(formIsValid);
  };

  const inputElementArray = [];
  for (let key in orderForms) {
    inputElementArray.push({
      id: key,
      config: orderForms[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {inputElementArray.map((inputElement) => (
        <Input
          key={inputElement.id}
          changed={(event) => inputChangeHandler(event, inputElement.id)}
          elementType={inputElement.config.elementType}
          elementConfig={inputElement.config.elementConfig}
          invalid={!inputElement.config.valid}
          shouldValidate={inputElement.config.validation}
          touched={inputElement.config.touched}
          value={inputElement.value}
        />
      ))}
      <Button btnType="Success" clicked={orderHandler} disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={styles.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (token, orderData) =>
      dispatch(actions.purchaseBurger(token, orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
