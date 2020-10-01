import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from "../../../axios-orders";
import Spinner from '../../../axios-orders';
import spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zip:''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

           this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Phil",
        address: {
          street: "highland ave",
          zip: "90028",
        },

        email: "..@myahoo.com",
      },
      shipping: "1day",
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false});
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
    //firebase will automatically create a Orders node! (even if we dont have it for now)
    //alert ('you are buying it!!!!');
    }

    render( ) {
            let form = ( <form>
                <input className = {classes.Input} type = 'text' name = 'name'  placeholder = 'Your Name' />
                <input className = {classes.Input} type = 'text' name = 'email'  placeholder = 'Your Email' />
                <input className = {classes.Input} type = 'text' name = 'street'  placeholder = 'Your address' />
                <input className = {classes.Input} type = 'text' name = 'zip'  placeholder = 'Your Zip' />
                <Button btnType = 'Success' clicked = {this.orderHandler}>ORDER</Button>
            </form>);
            if (this.state.loading) {
                form = <Spinner />
            }
        return(
            <div className = {classes.ContactData}>
                <h4>Enter Your Data</h4>
                {form}
            </div>
        ) ;
    }

}

export default ContactData;