import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'


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
        totalPrice: 4.99
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
        <Burger ingredients = {this.state.ingredients}></Burger>
        <BuildControls
        ingredientAdded = {this.addIngredientHandler}
        ingredientRemoved = {this.removeIngredientHandler}
        disabled = {disabledInfo}
        price = {this.state.totalPrice} />

      </Aux>
    );
  }
}

export default BurgerBuilder;
