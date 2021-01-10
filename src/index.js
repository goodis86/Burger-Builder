import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { watchAuth, watchBurgerBuilder, watchOrder } from './store/sagas/index';
//import { logout } from './store/actions';
//import order from './components/CheckoutSummary/Order';

// if our evnironmental variable NODE_ENV is development = we allow redux dev tools, 
// if we are not in development mode - redux dev tools will not be available for security reasons!!!!!!
// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;


const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware(); 

// allows us to have asynchronous action creators
const store = createStore (rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
    )); 

    sagaMiddleware.run(watchAuth);
    sagaMiddleware.run(watchBurgerBuilder);
    sagaMiddleware.run(watchOrder);



const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();


// TIME FOR TESTING!!!!
// JEST IS ALREADY PREINSTALLED W OUR CREATE REACT APP
// INSTALLING ENZYME THROUGH NODE PACKAGE MANAGEMENT...... npm install --save enzyme
//ALSO INSTALLING 2 PACKAGES TO MAKE SURE ENZYME WORKS WITH OUR PROJECT CORRECTLY
// react-test-renderer and enzyme-adapter-react-16


// created new branch : feature/redux-saga 
// testing the feature


// created new branch : feature/react-hooks!