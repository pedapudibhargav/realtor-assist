"use client";
import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';

export default function page() {
  const [errors, setErrors] = React.useState([]);
  const BE_URI = process.env.NEXT_PUBLIC_BE_URI;
  
  const validateFormData = (e) => {
    const email = e.target.email.value;
    const password = e.target.password.value;
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const confirmPassword = e.target['confirm-password'].value;

    let errors = [];
    if (!email) {
      errors.push('Email is required');
    }
    if (!password) {
      errors.push('Password is required');
    }
    if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }
    if (!firstname) {
      errors.push('First name is required');
    }
    if (!lastname) {
      errors.push('Last name is required');
    }
    setErrors(errors);
    if (errors.length > 0) {
      return false;
    }
    return true;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validateFormData(e)) {
      return;
    }
    setErrors([]);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;

    fetch(BE_URI+'/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
    )
    .then(data => {
      console.log('Success:', data);
    }
    )
    .catch((error) => {
      console.error('Error:', error);
      setErrors([error.message]);
    }
    );
    console.log(email, password, firstname, lastname);
  }
  return (
    <>
      <style type="text/css">
        {
          `
                .singup-card {
                    margin-top: 10rem;
                }
                `
        }
      </style>
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <div className='singup-card'>
              <h1 className='text-center'>Sing up</h1>
              <Card
                bg={'dark'}
                text={'white'}
              >
                <CardBody>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                      <input type="password" className="form-control" id="confirm-password" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="firstname" className="form-label">First Name</label>
                      <input type="text" className="form-control" id="firstname" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lastname" className="form-label">Last Name</label>
                      <input type="text" className="form-control" id="lastname" />
                    </div>
                    {errors.length > 0 && (
                      <div className="alert alert-danger" role="alert">
                        <ul>
                          {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary">Sing Up</button>
                  </form> 
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
