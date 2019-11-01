import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ShopContext from '../Context/ShopContext';
import { PRODUCTS, SIGN_IN } from '../Config/routes';
import { withRouter } from 'react-router';

const SignOut = props => {
  const context = useContext(ShopContext);

  const handleButton = e => {
    if (e.target.id === 'no') props.history.push(PRODUCTS);
    else if (e.target.id === 'yes') {
      context
        .logOut()
        .then(() => {
          context.updateUserStatus();
          props.history.push(SIGN_IN);
        })
        .catch(error => {
          console.log('error:', error.message);
          props.history.push(PRODUCTS);
        });
    }
  };

  return (
    <Modal.Dialog>
      <Modal.Body>
        <p>Logout?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button id="no" variant="secondary" onClick={handleButton}>
          No
        </Button>
        <Button id="yes" variant="primary" onClick={handleButton}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};
export default withRouter(SignOut);
