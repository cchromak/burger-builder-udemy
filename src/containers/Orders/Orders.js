import React, { Component } from 'react';
import Order from '../../components/Order/Order';

import axios from '../../axios-oders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    // Fetch orders, component will only mount if there are new orders
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchOrders = [];
                // Distribute properites of order object with spread op into array, adding one new properite order id (key)
                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log(fetchOrders);
                this.setState({
                    loading: false
                })
            })
            .catch(err => {
                this.setState({
                    loading: true
                })
            });
    };

    render() {
        return(
            <div>
                <Order />
                <Order />
            </div>
            
        );
    }
};

export default withErrorHandler(Orders, axios);