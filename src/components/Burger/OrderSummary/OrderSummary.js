import React from 'react';

import Aux from '../../../hoc/Auxiliary'

import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
    return ( 
    <li key = {igKey}>
    <span style = {{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
    </li>);
    });
    return (
        <Aux>
            <h3>YOUR ORDER</h3>
            <p>YOUR BUrgER INgredienTS</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType = 'Danger' clicked = {props.purchaseCancelled}>CANcEL</Button>
            <Button btnType = 'Success' clicked = {props.purchaseContinued}>CONtinuE</Button>
        </Aux>
    )
};


export default orderSummary;