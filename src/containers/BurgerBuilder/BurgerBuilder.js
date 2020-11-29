import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import {connect} from 'react-redux';
import * as actionTypes from "../../store/actions/actionTypes";



class BurgerBuilder extends Component {
  //    constructor(props) {          alternative to state manipulations to what's below!!!
  //        super(props);
  //        this.state = {}
  //    }

  state = {
    
        buyMode: false,
        loading: false,
        error: false
  };

  componentDidMount() {
    console.log(this.props);
    // axios
    //   .get("https://react-my-burger-8dff2.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({errro: true})
    //   });
  }

  updateCanBuyState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return  sum > 0;
  }

  buyHandler = () => {
    this.setState({ buyMode: true });
  };
  buyCancelHandler = () => {
    this.setState({ buyMode: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    


    let burger = 
    this.state.error ? <p>INgredients cant be loaded</p> : <Spinner />

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}></Burger>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            canBuy={this.updateCanBuyState(this.props.ings)}
            ordered={this.buyHandler}
            price={this.props.price}
          />
        </Aux>
      );
      orderSummary = <OrderSummary
      ingredients={this.props.ings}
      price={this.props.price}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}


export default connect (mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));
