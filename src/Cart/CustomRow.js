import React, { Fragment } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const CustomRow = ({ items, deleteProductFromCart }) => {
  return (
    <Fragment>
      <Row>
        {items.map((item, index) => {
          return (
            <Col key={index} xs={12} sm={12} md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.quantity} Unit(s)</Card.Text>
                  <Card.Text>Total of: ${item.totalValue}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={deleteProductFromCart.bind(
                      this,
                      item.id,
                      item.quantity
                    )}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};
export default CustomRow;
