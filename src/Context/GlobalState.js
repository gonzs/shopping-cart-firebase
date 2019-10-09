import React, { Component } from "react";
import { db, getAllProducts, setAllProducts } from '../Firebase';
import ShopContext from "./ShopContext";

class GlobalState extends Component {
  state = {
    products: [],
    cart: []
  };

  componentDidMount() {
    /* Initial load of products */
    // setAllProducts(db); /* Was executed before */

    getAllProducts(db).then(retrievedProducts =>
      this.setState({ products: retrievedProducts })
    );
  }

  addProductToCart = product => {
    setTimeout(() => {
      let newCart = [];
      let updatedProducts = [];

      /* Check Stock */
      let indexProd = this.state.products.findIndex(prod => {
        return prod.id === product.id;
      });

      if (this.state.products[indexProd].stock > 0) {
        let indexCart = this.state.cart.findIndex(item => {
          return item.id === product.id;
        });

        /* Add product to cart */
        if (indexCart === -1) {
          /*New item */
          this.setState({
            cart: this.state.cart.concat([
              {
                id: product.id,
                name: product.name,
                quantity: 1,
                totalValue: product.price
              }
            ])
          });
        } else {
          /* Existing item */
          newCart = this.state.cart;

          newCart[indexCart].quantity = newCart[indexCart].quantity + 1;
          newCart[indexCart].totalValue =
            newCart[indexCart].totalValue + product.price;

          this.setState({
            cart: newCart
          });
        }

        /* Update Stock */
        updatedProducts = this.state.products;

        updatedProducts[indexProd].stock--;

        this.setState({ products: updatedProducts });
      }
    }, 100);
  };

  deleteProductFromCart = (id, quantity) => {
    setTimeout(() => {
      let newCart = this.state.cart;

      /* Delete item */
      this.setState({ cart: newCart.filter(item => item.id !== id) });

      let indexProd = this.state.products.findIndex(prod => {
        return prod.id === id;
      });

      let updatedProducts = this.state.products;

      updatedProducts[indexProd].stock =
        updatedProducts[indexProd].stock + parseInt(quantity);

      this.setState({ products: updatedProducts });
    }, 100);
  };

  buyCart = () => {
    if (this.state.cart.length !== 0)
      setTimeout(() => {
        this.setState({ cart: [] });
        alert("Cart Ordered!!!");
      }, 1000);
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          products: this.state.products,
          cart: this.state.cart,
          addProductToCart: this.addProductToCart,
          deleteProductFromCart: this.deleteProductFromCart,
          buyCart: this.buyCart
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

export default GlobalState;
