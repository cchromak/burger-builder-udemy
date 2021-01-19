import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-oders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'standard', displayValue: 'Standard'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            },
        },
        loading: false
    }

    orderHandler = ( event ) => {
        // Prevent default bc you dont want to send a request automatically
        // bc it would reload the page
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIndetifier in this.state.orderForm) {
            formData[formElementIndetifier] = this.state.orderForm[formElementIndetifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderDate: formData
        } 
        axios.post('./orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
   
    }

    inputChangedHandler = (event, inputIdentifer) => {
        // Implemented two way binding. updates value in state for orderform.
        // immutably updated affected form elements
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifer]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifer] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        // Create array of js objects orderform
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }
        let form = (
            // Using unSubmit event handler
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" >ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        } 
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                { form }               
            </div>
        );
    }
}

export default ContactData;