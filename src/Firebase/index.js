import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Products } from '../Config/data';
import { firebaseConfig } from './firebaseConfig';
import { func } from 'prop-types';

/* Initialize Firebase */

const Firebase = firebase.initializeApp(firebaseConfig);

/* Initialize DB */
export const db = Firebase.firestore();
/* Initialize auth */
export const auth = Firebase.auth();

/* Load products from data file */
export const setAllProducts = db => {
  Products.map((prod, index) => {
    db.collection('products')
      .doc(prod.id)
      .set({
        name: prod.name,
        price: prod.price,
        stock: prod.stock
      })
      .then(() => console.log('Document successfully written!'))
      .catch(error => console.error('Error writing document: ', error));
    return true;
  });
};

/* Update products */
export const updateProduct = (db, item) => {
  db.collection('products')
    .doc(item.id)
    .update({
      stock: item.stock
    })
    .then(() => console.log('Document successfully written!'))
    .catch(error => console.error('Error writing document: ', error));
};

/* Read All documents from Products Collection */
export const getAllProducts = db => {
  return new Promise((resolve, reject) => {
    let products = [];
    resolve(
      db
        .collection('products')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let prod = {
              id: doc.id,
              name: doc.data().name,
              price: doc.data().price,
              stock: doc.data().stock
            };

            products.push(prod);
          });
          return products;
        })
        .catch(error => console.error('Error getting documents', error))
    );
  });
};

/* Create User */
export const createUser = (auth, email, password) => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
