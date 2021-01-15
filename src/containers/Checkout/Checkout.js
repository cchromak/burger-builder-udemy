import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients : {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        }
    }

    componentDidMount() {
        // Extract query params
        const query = new URLSearchParams(this.props.location.search);
        // Create new object to store in state
        const ingredients = {};
        // Loop through differnet query params
        for (let param of query.entries()) {
            // key/value => ['salad', '1']
            // Add + to param[1] to convert to number
            ingredients[param[0]] = +param[1];
        }
        // Set state
        this.setState({ingredients: ingredients});
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
            </div>
        );
    }
}

export default Checkout;