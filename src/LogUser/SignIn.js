import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router';
import { PRODUCTS, SIGN_UP } from '../Config/routes';
import { Link } from 'react-router-dom';
import ShopContext from '../Context/ShopContext';
import Alert from 'react-bootstrap/Alert';

const SignIn = props => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const context = useContext(ShopContext);

  const handleSubmit = () => {
    context
      .logIn(email, password)
      .then(response => {
        context.updateUserStatus(response.user);
        props.history.push(PRODUCTS);
      })
      .catch(error => {
        console.log('error:', error.message);
        setMessage({ success: false, text: error.message });
      });
  };

  return (
    <Container>
      <Form>
        <Row>
          <Col xs={12} sm={12} md={6}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={2}>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Login
            </Button>
          </Col>
          <Col xs={12} sm={12} md={3}>
            Not registered?
            <Link to={SIGN_UP}> Sign-up</Link>
          </Col>
        </Row>
      </Form>
      <br />
      <Row>
        <Col xs={12} sm={12} md={6}>
          {message !== undefined && !message.success ? (
            <Alert variant="danger">{message.text}</Alert>
          ) : (
            <div></div>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default withRouter(SignIn);
