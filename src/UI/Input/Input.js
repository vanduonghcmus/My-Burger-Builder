import React from "react";

import styles from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  const inputStyles = [styles.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputStyles.push(styles.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          className={inputStyles.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className={inputStyles.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.changed}
          className={inputStyles.join(" ")}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          className={inputStyles.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
  }
  let validation = null;
  if (props.invalid && props.touched) {
    validation = (
      <p className={styles.Validation}>Please enter a valid value</p>
    );
  }

  return (
    <div className={styles.Input}>
      <span className={styles.Label}>{props.label}</span>
      {inputElement}
      {validation}
    </div>
  );
};
export default input;
