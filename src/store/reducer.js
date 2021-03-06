// import constants for actions
import * as actionTypes from './actions';

// create const intialState to define what state is initially
const initialState = {
    // copied from BurgerBuilder container state
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
};

// brought over from BurgerBuilder
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

// create reducer
const reducer = (state = initialState, action) => {
    // handle acitons
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    // ...state above alone is not enough. doenst create deep clones on its own. 
                    // spread out the properites of old object into new one like below
                    ...state.ingredients,
                    // will will get on our payload of the action, fetch old value and add 1
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

            };
        default:
            return state;
    }
};

export default reducer;




// got to index.js to add provider, wrap <App />
