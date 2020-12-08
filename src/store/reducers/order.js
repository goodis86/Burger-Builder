import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

// utility function used to get rid of redundancy in our code!!!!
//(copying old state, and updating with altered props, etc.)!!!!!
const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state, action) => {            // taking the logic in a function to make reducer leaner
    return updateObject(state, {purchased: false});  // either or works just fine!!!
};                                                   // depends on how you want your reducer to look!!!

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);  // VER.1 - using function declared above !!!!
        
        case actionTypes.PURCHASE_BURGER_START:
        return updateObject(state, {loading: true}); // VER.2 - using our utility function to make our code leaner!!!

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, {id: action.orderId});
        return updateObject(state, { loading: false, purchased: true, 
                orders: state.orders.concat(newOrder)});
              
        case actionTypes.PURCHASE_BURGER_FAIL:
        return updateObject(state, {loading: false});

        case actionTypes.FETCH_ORDERS_START:
        return updateObject(state, {loading: true});

        case actionTypes.FETCH_ORDERS_SUCCESS:
        return updateObject(state, {orders: action.orders, loading: false });

        case actionTypes.FETCH_ORDERS_FAIL:
        return updateObject(state, {loading: false});
        
        default:
            return state;
    }
};


export default reducer;