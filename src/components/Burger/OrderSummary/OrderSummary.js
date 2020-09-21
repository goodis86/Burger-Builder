import React, {Component} from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary'

import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    // this could be functional component ....

    componentDidUpdate() {
        console.log('[OrderSummary] DidUpdate');
    }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
    return ( 
    <li key = {igKey}>
    <span style = {{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
    </li>);
    });
  

        return (
            <Aux>
            <h3>YOUR ORDER</h3>
            <p>YOUR BUrgER INgredienTS</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)} </strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType = 'Danger' clicked = {this.props.purchaseCancelled}>CANcEL</Button>
            <Button btnType = 'Success' clicked = {this.props.purchaseContinued}>CONtinuE</Button>
        </Aux>
        );
    }
} 



export default OrderSummary;