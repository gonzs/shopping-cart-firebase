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

const SignIn = props => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const context = useContext(ShopContext);

  const handleSubmit = () => {
    context.logIn();
    props.history.push(PRODUCTS);
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
              Sign-in
            </Button>
          </Col>
          <Col xs={12} sm={12} md={3}>
            Not registered?
            <Link to={SIGN_UP}> Sign-up</Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
export default withRouter(SignIn);
