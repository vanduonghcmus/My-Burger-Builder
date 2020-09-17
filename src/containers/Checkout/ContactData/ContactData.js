import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-burgerSummary";
import Spinner from "../../../UI/Spinner/Spinner";
import Input from "../../../UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/action/index";
import { updatedObject, checkValidity } from "../../../shared/Utility";

class ContactData extends Component {
  state = {
    orderForms: {
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
    },
    formIsValid: false,
  };

  componentDidMount() {
    console.log(this.state.orderForms);
  }

  orderHandler = (event) => {
    event.preventDefault(); // to not reload the page
    const formData = {};
    for (let formElementIdentifier in this.state.orderForms) {
      formData[formElementIdentifier] = this.state.orderForms[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(this.props.token, order);
  };

  inputChangeHandler = (event, inputIdentify) => {
    const updateFormElement = updatedObject(
      this.state.orderForms[inputIdentify],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForms[inputIdentify].validation
        ),
        touched: true,
      }
    );
    const updateOrderForm = updatedObject(this.state.orderForms, {
      [inputIdentify]: updateFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updateOrderForm) {
      formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
      /* valid: true && formIsValid= true => true;
				 valid: true && formIsValid= true => true; */
    }
    console.log(formIsValid);
    this.setState({ orderForms: updateOrderForm, formIsValid: formIsValid });
  };

  render() {
    const inputElementArray = [];
    for (let key in this.state.orderForms) {
      inputElementArray.push({
        id: key,
        config: this.state.orderForms[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {inputElementArray.map((inputElement) => (
          <Input
            key={inputElement.id}
            changed={(event) => this.inputChangeHandler(event, inputElement.id)}
            elementType={inputElement.config.elementType}
            elementConfig={inputElement.config.elementConfig}
            invalid={!inputElement.config.valid}
            shouldValidate={inputElement.config.validation}
            touched={inputElement.config.touched}
            value={inputElement.value}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

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
