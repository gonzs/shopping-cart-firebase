import React, { Component } from 'react';
import {
  db,
  auth,
  getProducts,
  createProducts,
  updateProducts,
  createUser,
  signInUser,
  signOutUser
} from '../Firebase';
import { Products } from '../Config/data';
import ShopContext from './ShopContext';

class GlobalState extends Component {
  state = {
    products: [],
    cart: []
  };

  componentDidMount() {
    try {
      /* Initial load of products to Firebase using Config/Data */
      // createProducts(db, Products)
      //   .then(() => console.log('Successful initial load of products'))
      //   .catch(error => console.error(error));

      /* Get Products from Firebase */
      getProducts(db)
        .then(retrievedProducts =>
          this.setState({ products: retrievedProducts })
        )
        .catch(error => console.log(error));

      this.updateUserStatus();
    } catch (error) {}
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

    if (cart.length !== 0) {
      updateProducts(db, products)
        .then(() => {
          console.log('Successful items update');
          this.setState({ cart: [] });
          alert('Cart Ordered!!!');
        })
        .catch(error => console.error(`Any item was not updated`, error));
    }
  };

  register = (email, password) => {
    return createUser(auth, email, password);
  };

  logIn = (email, password) => {
    return signInUser(auth, email, password);
  };

  logOut = () => {
    return signOutUser(auth);
  };

  updateUserStatus = (user = auth.currentUser) => {
    if (user != null)
      user.providerData.forEach(profile => {
        this.setState({ user: { logged: true, name: profile.email } });
      });
    else this.setState({ user: { logged: false } });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          products: this.state.products,
          cart: this.state.cart,
          user: this.state.user,
          addProductToCart: this.addProductToCart,
          deleteProductFromCart: this.deleteProductFromCart,
          buyCart: this.buyCart,
          register: this.register,
          logIn: this.logIn,
          logOut: this.logOut,
          updateUserStatus: this.updateUserStatus
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

export default GlobalState;
