import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.75,
  meat: 1,
  bacon: 1.25,
};

class BurgerBuilder extends Component {
  //    constructor(props) {          alternative to state manipulations to what's below!!!
  //        super(props);
  //        this.state = {}
  //    }

  state = {
    ingredients: null,
    totalPrice: 4.99,
    canBuy: false,
    buyMode: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("https://react-my-burger-8dff2.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({errro: true})
      });
  }

  updateCanBuyState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ canBuy: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updateCanBuyState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updateCanBuyState(updatedIngredients);
  };

  buyHandler = () => {
    this.setState({ buyMode: true });
  };
  buyCancelHandler = () => {
    this.setState({ buyMode: false });
  };

  purchaseContinueHandler = () => {
 
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice );
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    


    let burger = 
    this.state.error ? <p>INgredients cant be loaded</p> : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}></Burger>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            canBuy={this.state.canBuy}
            ordered={this.buyHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );
      orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      price={this.state.totalPrice}
      purchaseCancelled={this.buyCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
    />
     
    }

    
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.buyMode} modalClosed={this.buyCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
