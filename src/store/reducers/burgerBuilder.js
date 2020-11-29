import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4.99,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.75,
    meat: 1,
    bacon: 1.25,
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] +1
                }, 
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]

            };
        case actionTypes.REMOVE_INGREDIENT : 
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] -1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

        };
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4.99,
                error: false
            };

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default :
            return state;   
    }


};


export default reducer;