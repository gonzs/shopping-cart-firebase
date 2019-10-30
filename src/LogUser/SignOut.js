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
      context.logOut();
      props.history.push(SIGN_IN);
    }
  };

  return (
    <Modal.Dialog>
      <Modal.Body>
        <p>Sign-Out?</p>
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
