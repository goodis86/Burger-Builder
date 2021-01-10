import React, { useState, useEffect, useCallback } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../store/actions/index";

import axios from "../../axios-orders";

const burgerBuilder = props => {     // by exporting this class we strip out connection to redux and make it easy to test our BugerBuilder component!!!!
  //    constructor(props) {          alternative to state manipulations to what's below!!!
  //        super(props);
  //        this.state = {}
  //    }

  const [buyMode, setBuyMode] = useState(false);

  const dispatch = useDispatch();

  
 const ings =  useSelector(state => {
    return  state.burgerBuilder.ingredients;
  });
 const price =  useSelector(state => {
    return  state.burgerBuilder.totalPrice;
  });
 const error =  useSelector(state => {
    return  state.burgerBuilder.error;
  });
 const isAuthenticated =  useSelector(state => {
    return  state.auth.token !== null;
  });

  const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));


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
    if(isAuthenticated) {

     setBuyMode(true);
    } else  {
        onSetAuthRedirectPath('/checkout');
        props.history.push('/auth');
    }
  };
  
 const buyCancelHandler = () => {
   setBuyMode(false);
  };

 const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  }

 
    const disabledInfo = {
      ...ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    


    let burger = 
    error ? <p>INgredients cant be loaded</p> : <Spinner />

    if (ings) {
      burger = (
        <Aux>
          <Burger ingredients={ings}></Burger>
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            canBuy={updateCanBuyState(ings)}
            ordered={buyHandler}
            isAuth = {isAuthenticated}
            price={price}
          />
        </Aux>
      );
      orderSummary = <OrderSummary
      ingredients={ings}
      price={price}
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





export default withErrorHandler(burgerBuilder, axios);


