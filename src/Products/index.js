import React, { Component } from "react";
import ShopContext from "../Context/ShopContext";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

class Products extends Component {
  render() {
    return (
      <ShopContext.Consumer>
        {context => (
          <div>
            <h1>Products</h1>

            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {context.products.length === 0 ? (
                  <tr>
                    <td colSpan="5" align="center">
                      <Spinner animation="border" variant="primary" />
                    </td>
                  </tr>
                ) : (
                  context.products.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.stock} Unit(s)</td>
                        <td>
                          <Button
                            onClick={context.addProductToCart.bind(
                              this,
                              product
                            )}
                            disabled={!(product.stock > 0)}
                          >
                            Add
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </div>
        )}
      </ShopContext.Consumer>
    );
  }
}

export default Products;
