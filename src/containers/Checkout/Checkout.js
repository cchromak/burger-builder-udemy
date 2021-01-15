import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        // Extract query params
        const query = new URLSearchParams(this.props.location.search);
        // Create new object to store in state
        const ingredients = {};
        let price = 0;
        // Loop through differnet query params
        for (let param of query.entries()) {
            // key/value => ['salad', '1']
            // Add + to param[1] to convert to number
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        // Set state
        this.setState({ingredients: ingredients, price: price});
    }

    checkoutCanelledHandler = () => {
        this.props.history.goBack();
    }

    
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCanelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)} />
            </div>
        );
    }
}

export default Checkout;