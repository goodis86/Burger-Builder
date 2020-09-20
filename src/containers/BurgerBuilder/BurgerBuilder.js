import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from '../../components/Burger/Burger';

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
        }
    }
  render() {
    return (
      <Aux>
        <Burger ingredients = {this.state.ingredients}></Burger>
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
