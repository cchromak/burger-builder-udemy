import React, { Component } from 'react';
// Redux >
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-oders';
import * as actionTypes from '../../store/actions'; 


// removed, not needed after Redux
// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     bacon: 0.7,
//     cheese: 0.4,
//     meat: 1.3
// }

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // removed > Redux
            // ingredients: null,
            // totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false
        };
    };

    componentDidMount () {
        // axios.get('https://burger-builder-be372-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0})
    };

    // removed addIngredient/removeIngredient after Redux brought in
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // };

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const newCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = newCount;
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice - INGREDIENT_PRICES[type];
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: updatedPrice
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        
        
        // pass props in query
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) +  '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    render() {
        const disabledInfo = {
            // before Redux '...this.state.ingredients' now replaced with 'this.props.ings'
            // ...this.state.ingredients
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        let orderSummary = <OrderSummary 
        totalPrice={this.props.price}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredients={this.props.ings} />;

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        let burger = <Spinner />
        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                    totalPrice={this.props.price}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo} 
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable} />
                </Auxiliary>
            );
        }
        
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing}
                    //    modalClosed={this.purchaseCancelHandler}
                       >
                    { orderSummary }
                </Modal>
                { burger }
            </Auxiliary>
        );
    }
}

// Redux > holds a function that recieves the state automatically and would return the js object
// where we define which prop should hold which slice of the state.
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

// Redux > holds a function that recieves the dipsatch function as an arg. reutrns an object that returns props 
// function mapping. 
const mapDispatchToProps = dispatch => {
    return {
        // pass functions off to props onIngredientAdded and onIngredientRemoved.. 
        // pass dispatch whic holds a js object
        onIngredientAdded: (ingName) => {dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName})},
        onIngredientRemoved: (ingName) => {dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})}
    }
}

// Redux > to connect to redux, wrap mapState & mapDispatch with connect then pass the entire withErrorHandler as an 
// arg to the funciton connect(...) function call returns us
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));