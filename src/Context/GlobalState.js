import React, { Component } from 'react';
import {
  db,
  auth,
  getAllProducts,
  setAllProducts,
  updateProduct,
  createUser
} from '../Firebase';
import ShopContext from './ShopContext';

class GlobalState extends Component {
  state = {
    products: [],
    cart: [],
    logged: { status: false, user: '' }
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
    const cart = this.state.cart;
    const products = this.state.products;

    if (cart.length !== 0)
      setTimeout(() => {
        products.forEach(item => {
          updateProduct(db, item);
        });

        this.setState({ cart: [] });
        alert('Cart Ordered!!!');
      }, 1000);
  };

  register = (email, password) => {
    return createUser(auth, email, password)
      .then(response => {
        console.log('success:', response);
        return {
          success: true,
          text: 'User registered successfully'
        };
      })
      .catch(error => {
        console.log('error:', error.message);
        return { success: false, text: error.message };
      });
  };

  logIn = () => {
    this.setState({ logged: true, user: 'Gonzalo' });
  };

  logOut = () => {
    this.setState({ logged: false, user: '' });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          products: this.state.products,
          cart: this.state.cart,
          logged: this.state.logged,
          addProductToCart: this.addProductToCart,
          deleteProductFromCart: this.deleteProductFromCart,
          buyCart: this.buyCart,
          register: this.register,
          logIn: this.logIn,
          logOut: this.logOut
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

export default GlobalState;
