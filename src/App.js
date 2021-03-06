import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Products from './Products';
import Cart from './Cart';
import NavBar from './NavBar';
import GlobalState from './Context/GlobalState';
import {
  PRODUCTS,
  CHECKOUT,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  SUCCESS_SIGN_UP
} from './Config/routes';
import SignIn from './LogUser/SignIn';
import SignUp from './LogUser/SignUp';
import SignOut from './LogUser/SignOut';
import SuccessSignUp from './LogUser/SuccessSignUp';

class App extends Component {
  render() {
    return (
      <GlobalState>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path={PRODUCTS} component={Products} exact />
            <Route path={CHECKOUT} component={Cart} exact />
            <Route path={SIGN_IN} component={SignIn} />
            <Route path={SIGN_UP} component={SignUp} />
            <Route path={SIGN_OUT} component={SignOut} />
            <Route path={SUCCESS_SIGN_UP} component={SuccessSignUp} />} />
            <Redirect from="" to={PRODUCTS} />
          </Switch>
        </BrowserRouter>
      </GlobalState>
    );
  }
}

export default App;
