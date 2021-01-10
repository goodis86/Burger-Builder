import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import {connect} from 'react-redux';
import * as actions from "../../store/actions/index";

import axios from "../../axios-orders";

const burgerBuilder = props => {     // by exporting this class we strip out connection to redux and make it easy to test our BugerBuilder component!!!!
  //    constructor(props) {          alternative to state manipulations to what's below!!!
  //        super(props);
  //        this.state = {}
  //    }

  const [buyMode, setBuyMode] = useState(false);

  const {onInitIngredients} = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

   // console.log(props);
      // we execute onInitIngredients here to have our state filled with ingredients!!!
    

  const updateCanBuyState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return  sum > 0;
  }

 const buyHandler = () => {
    if(props.isAuthenticated) {

     setBuyMode(true);
    } else  {
        props.onSetAuthRedirectPath('/checkout');
        props.history.push('/auth');
    }
  };
  
 const buyCancelHandler = () => {
   setBuyMode(false);
  };

 const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  }

 
    const disabledInfo = {
      ...props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    


    let burger = 
    props.error ? <p>INgredients cant be loaded</p> : <Spinner />

    if (props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={props.ings}></Burger>
          <BuildControls
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            disabled={disabledInfo}
            canBuy={updateCanBuyState(props.ings)}
            ordered={buyHandler}
            isAuth = {props.isAuthenticated}
            price={props.price}
          />
        </Aux>
      );
      orderSummary = <OrderSummary
      ingredients={props.ings}
      price={props.price}
      purchaseCancelled={buyCancelHandler}
      purchaseContinued={purchaseContinueHandler}
    />
     
    }

    
    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Aux>
        <Modal show={buyMode} modalClosed={buyCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }


const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}


export default connect (mapStateToProps, mapDispatchToProps) (withErrorHandler(burgerBuilder, axios));


