import React, { Component } from "react";
import ShopContext from "../Context/ShopContext";
import Container from "react-bootstrap/Container";
import CustomRow from "./CustomRow";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

class Cart extends Component {
  static contextType = ShopContext;

  componentDidMount() {
    // console.log(this.context);
  }

  render() {
    const { cart, deleteProductFromCart, buyCart } = this.context;
    let newCart = [];

    let total = cart.reduce(
      (prevTotal, nextElement) => prevTotal + nextElement.totalValue,
      0
    );

    return (
      <div>
        <h1>Cart</h1>
        <Accordion>
          <Card>
            <Card.Header>Resume</Card.Header>
            <Card.Body>
              <Card.Title>Order</Card.Title>
              <Card.Text>Total value of ${total}</Card.Text>
              <Button
                variant="primary"
                onClick={buyCart.bind(this)}
                disabled={cart.length === 0}
              >
                Buy
              </Button>
            </Card.Body>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Detail
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Container>
                  {!cart.length ? (
                    <p align="center">No Items</p>
                  ) : (
                    cart.map((element, index) => {
                      newCart.push(element);

                      if ((index + 1) % 3 === 0 || index + 1 === cart.length) {
                        let newCartRow = newCart;
                        newCart = [];
                        return (
                          <CustomRow
                            key={index}
                            items={newCartRow}
                            deleteProductFromCart={deleteProductFromCart}
                          />
                        );
                      }
                      return false;
                    })
                  )}
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default Cart;
