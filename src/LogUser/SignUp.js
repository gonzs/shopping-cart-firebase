import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { SIGN_IN } from '../Config/routes';

const SignUp = props => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    alert('User registered successfully');
    props.history.push(SIGN_IN);
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
              Sign-Up
            </Button>
          </Col>
          <Col xs={12} sm={12} md={3}>
            Registered?
            <Link to={SIGN_IN}> Sign-in</Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
export default withRouter(SignUp);
