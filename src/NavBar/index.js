import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ShopContext from "../Context/ShopContext";

class NavBar extends Component {
  static contextType = ShopContext;

  render() {
    const { cart } = this.context;

    return (
      <Navbar bg="dark" variant="dark">
        <NavbarBrand href="/">Shopping Cart</NavbarBrand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/products">
            Products
          </Nav.Link>
          <Nav.Link as={Link} to="/checkout">
            Cart({cart.length})
          </Nav.Link>
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
