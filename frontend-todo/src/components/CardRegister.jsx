import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { API } from '../config/API';
import { useMutation } from 'react-query';

export default function RegisterCard({ toLogin }) {
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: ''
  })
  const { full_name, email, password } = form;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitRegister = useMutation(async function(e) {
    try {
      e.preventDefault()
      await API.post('/auth/register', form)

      const alert = (
        <Alert variant="success" className="py-1">
          Register success!
        </Alert>
      );

      setMessage(alert);
      setForm({
        full_name: '',
        email: '',
        password: ''
      })

    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed to register!
        </Alert>
      );
      setMessage(alert);

      throw err
    }
  })

  return (
    <Card>
      <Card.Body>
        { message && message }
        <h2>Register</h2>
        <Form onSubmit={(e) => handleSubmitRegister.mutate(e)}>
          <Form.Group controlId="formBasicFullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control 
              type="text" 
              value={full_name}
              name="full_name" 
              onChange={handleChange} 
              placeholder="Enter your full name" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              value={email}
              name="email" 
              onChange={handleChange} 
              placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password"
              value={password} 
              name="password" 
              onChange={handleChange} 
              placeholder="Password" />
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit">
            Register
          </Button>
          <p className='mt-3'>
            Already have an account? {" "}
            <span className="auth-toggle-link" onClick={toLogin} style={{cursor: 'pointer'}}>
              Login here
            </span>
          </p>
        </Form>
      </Card.Body>
    </Card>
  );
};