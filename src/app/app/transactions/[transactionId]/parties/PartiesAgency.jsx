import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Form, Row, Col, Alert } from 'react-bootstrap';

export default function PartiesAgency({ data, onChange }) {
  const [formData, setFormData] = useState(data);

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const updatedData = {
      ...formData,
      [id]: type === 'checkbox' ? checked : value
    };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = [];

    if (!formData.agentName) newErrors.push('Agent Name is required.');
    if (formData.emailAddress && !validateEmail(formData.emailAddress)) {
      newErrors.push('Invalid email address.');
    }
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.push('Invalid phone number.');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      setErrors([]);
      console.log('Form Data:', formData);
    }
  };

  return (
    <>
      <Card className="bg-dark text-white border-dark">
        <CardHeader className="d-flex justify-content-between align-items-center">
          <h5>Agency Information</h5>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="dualAgency" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Dual Agency (I represent both buyer and seller)"
                checked={formData.dualAgency}
                onChange={handleChange}
              />
            </Form.Group>
            {!formData.dualAgency && (
              <>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="agentName" className="mb-3">
                      <Form.Label>Agent Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter agent name"
                        value={formData.agentName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="phoneNumber" className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter phone number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="emailAddress" className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        value={formData.emailAddress}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="brokerage" className="mb-3">
                      <Form.Label>Brokerage</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter brokerage name"
                        value={formData.brokerage}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="notes" className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter any additional notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}
            {errors.length > 0 && (
              <Alert variant="danger">
                {errors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </Alert>
            )}
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
      <br />
    </>
  );
}
