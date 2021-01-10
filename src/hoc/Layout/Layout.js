import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
//import sideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
  const [sideDrawerisVisible, setSideDrawerIsVisible] = useState(false);

   const sideDrawerClosedHandler = () => {
       setSideDrawerIsVisible(false);
    }

   const sideDrawerToggleHandler = () => {
       setSideDrawerIsVisible(!sideDrawerisVisible);
    }

        return (
            <Aux>
                <Toolbar 
                isAuth = {props.isAuth}
                drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth = {props.isAuth}
                    open={sideDrawerisVisible}
                    closed={sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        )
    }


const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(layout);