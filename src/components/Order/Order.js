import React from "react";

import styles from "./Order.module.css";

const Order = (props) => {
  const ingredient = [];

  for (let ingredientName in props.ingredients) {
    ingredient.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredient.map((ig) => (
    <span
      key={ig.name}
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        padding: "5px",
        border: "1px solid #ccc",
        margin: "0px 8px",
      }}
    >
      {ig.name} ({ig.amount})
    </span>
  ));

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientOutput} </p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
