import React from 'react';
import classes from './Order.css';

const order = () => (
    <div className={classes.Order}>
        <p>Ingredients: Salsd (1)</p>
        <p>Price: <strong>USD 5.45</strong></p>
    </div>
);

export default order;