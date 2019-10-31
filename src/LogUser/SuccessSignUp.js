import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { SIGN_IN } from '../Config/routes';
import { withRouter } from 'react-router';

const SuccessSignUp = props => {
  let message = props.location.state.id;

  const handleButton = e => {
    props.history.push(SIGN_IN);
  };

  return (
    <Modal.Dialog>
      <Modal.Body>
        <p>{message}</p>
        <Button id="ok" variant="primary" onClick={handleButton}>
          OK
        </Button>
      </Modal.Body>
    </Modal.Dialog>
  );
};
export default withRouter(SuccessSignUp);
