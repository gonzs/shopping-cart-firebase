import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { SIGN_IN, SUCCESS_SIGN_UP } from '../Config/routes';
import ShopContext from '../Context/ShopContext';
import Alert from 'react-bootstrap/Alert';

const SignUp = props => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const context = useContext(ShopContext);

  const handleSubmit = () => {
    context
      .register(email, password)
      .then(response => {
        console.log('success:', response);
        setMessage({
          success: true,
          text: 'User registered successfully'
        });
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
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
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
          <Col xs={12} sm={12} md={6}>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={2}>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Register
            </Button>
          </Col>
          <Col xs={12} sm={12} md={3}>
            Registered?
            <Link to={SIGN_IN}> Sign-in</Link>
          </Col>
        </Row>
      </Form>
      <br />
      <Row>
        <Col xs={12} sm={12} md={6}>
          {message !== undefined && !message.success ? (
            <Alert variant="danger">{message.text}</Alert>
          ) : message !== undefined && message.success ? (
            <Redirect
              to={{
                pathname: SUCCESS_SIGN_UP,
                state: { id: message.text }
              }}
            />
          ) : (
            <div></div>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default withRouter(SignUp);
