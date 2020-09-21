import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = 
{
  salad: 0.5,
  cheese: .75,
  meat: 1,
  bacon: 1.25
};


class BurgerBuilder extends Component {
//    constructor(props) {          alternative to state manipulations to what's below!!!
//        super(props);
//        this.state = {}
//    }
   
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat:0
        },
        totalPrice: 4.99,
        canBuy: false,
        buyMode: false
    }

    updateCanBuyState (ingredients) {
     
      const sum = Object.keys(ingredients)
      .map (igKey => {
        return ingredients[igKey];
      }).reduce((sum,el) => {
        return sum + el;
      }, 0);
      this.setState({canBuy: sum > 0});
    }

    addIngredientHandler  = (type) =>{
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount +1;
      const updatedIngredients = {...this.state.ingredients};
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
      this.updateCanBuyState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      if (oldCount <= 0) {
        return;
      }
      const updatedCount = oldCount -1;
      const updatedIngredients = {...this.state.ingredients};
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
      this.updateCanBuyState(updatedIngredients);
    }

    buyHandler = () => {
      this.setState({buyMode: true})
    }
    buyCancelHandler = () => {
      this.setState({buyMode: false})
    }
    purchaseContinueHandler = () => {
      alert ('you are buying it!!!!')
    }
 
    render() {
    const disabledInfo = {
      ...this.state.ingredients 
    };
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <=0
    }
    return (
      <Aux>
        <Modal show = {this.state.buyMode}
        modalClosed = {this.buyCancelHandler}>
            <OrderSummary 
            ingredients = {this.state.ingredients}
            price = {this.state.totalPrice}
            purchaseCancelled = {this.buyCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}/>
        </Modal>
        <Burger ingredients = {this.state.ingredients}></Burger>
        <BuildControls
        ingredientAdded = {this.addIngredientHandler}
        ingredientRemoved = {this.removeIngredientHandler}
        disabled = {disabledInfo}
        canBuy = {this.state.canBuy}
        ordered = {this.buyHandler}
        price = {this.state.totalPrice} />
        {/* <button>ORDER ME NOW!</button> */}

      </Aux>
    );
  }
}

export default BurgerBuilder;
