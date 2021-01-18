import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-oders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            stree: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //alert('You continue!');
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Chris Chromak",
                address: {
                    street: '31st Street',
                    zipCode: '11106',
                    country: 'USA'
                },
                email: 'chris@email.com'
            },
            deliveryMethod: 'fastest'
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

    render() {
        let form = (
            <form>
                <Input inputtype="input" name="name" placeholder="Your name" />
                <Input inputtype="input"  name="email" placeholder="Your eamil" />                  
                <Input inputtype="input" name="street" placeholder="Street" />
                <Input inputtype="input" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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