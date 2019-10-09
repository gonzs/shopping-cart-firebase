import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Products from "./Products";
import Cart from "./Cart";
import NavBar from "./NavBar";
import GlobalState from "./Context/GlobalState";

class App extends Component {
  render() {
    return (
      <GlobalState>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/products" component={Products} exact />
            <Route path="/checkout" component={Cart} exact />
            <Redirect from="" to="/products" />
          </Switch>
        </BrowserRouter>
      </GlobalState>
    );
  }
}

export default App;
