import React, { useContext, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { API, setAuthToken } from '../config/API';
import { useMutation } from 'react-query';
import { UserContext } from '../store/Context';
import { useNavigate } from 'react-router-dom';

export default function LoginCard({ toRegis, isRegis }) {
  let navigate = useNavigate();
  const [_, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null)
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post('/auth/login', form);
      console.log(response);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      });

      setAuthToken(localStorage.token);

      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessage(alert);

      navigate("/todo")
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      throw error
    }
  });
  return (
    <Card>
      <Card.Body>
        { message && message }
        <h2>Login</h2>
        <Form onSubmit={(e) => handleSubmitLogin.mutate(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              name="email"
              onChange={handleChange}
              placeholder="Enter email" 
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              name="password"
              onChange={handleChange}
              placeholder="Password" 
            />
          </Form.Group>
          <Button 
            className='mt-3' 
            variant="primary" 
            type="submit"
          >
            Login
          </Button>
          <p className='mt-3'>
            {isRegis ? 'Already have an account? ' : "Don't have an account?"}
            <span className="auth-toggle-link" onClick={toRegis} style={{cursor: 'pointer'}}>
              {isRegis ? 'Login here' : ' Register here'}
            </span>
          </p>
        </Form>
      </Card.Body>
    </Card>
  );
};


