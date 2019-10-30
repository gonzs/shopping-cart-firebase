import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ShopContext from '../Context/ShopContext';
import { PRODUCTS, CHECKOUT, SIGN_IN, SIGN_OUT } from '../Config/routes';

class NavBar extends Component {
  static contextType = ShopContext;

  render() {
    const { cart, logged, user } = this.context;

    const loggedComp = (
      <Nav.Link as={Link} to={SIGN_IN}>
        Sign-in
      </Nav.Link>
    );
    const noLoggedComp = (
      <Nav.Link as={Link} to={SIGN_OUT}>
        {user}(Sign-out)
      </Nav.Link>
    );

    return (
      <Navbar bg="dark" variant="dark">
        <NavbarBrand href="/">Shopping Cart</NavbarBrand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={PRODUCTS}>
            Products
          </Nav.Link>
          <Nav.Link as={Link} to={CHECKOUT}>
            Cart({cart.length})
          </Nav.Link>
          {!logged ? loggedComp : noLoggedComp}
        </Nav>

        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            disabled={true}
          />
          <Button variant="outline-info" disabled={true}>
            Search
          </Button>
        </Form>
      </Navbar>
    );
  }
}
export default NavBar;
