import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Form, Row, Col, Alert } from 'react-bootstrap';

export default function ClientInformation({ data, onChange }) {
    const [formData, setFormData] = useState(data);

    const handleChange = (section, field, value) => {
        const updatedData = {
            ...formData,
            [section]: {
                ...formData[section],
                [field]: value
            }
        };
        setFormData(updatedData);
        onChange(updatedData);
    };

    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!formData.buyersInformation.buyerName) newErrors.push('Buyer Name is required.');
        if (!formData.buyersInformation.phoneNumber) newErrors.push('Buyer Phone Number is required.');
        if (!formData.buyersInformation.emailAddress) newErrors.push('Buyer Email Address is required.');
        if (!formData.sellersInformation.sellerName) newErrors.push('Seller Name is required.');
        if (!formData.sellersInformation.phoneNumber) newErrors.push('Seller Phone Number is required.');
        if (!formData.sellersInformation.emailAddress) newErrors.push('Seller Email Address is required.');

        if (newErrors.length > 0) {
            setErrors(newErrors);
        } else {
            setErrors([]);
            console.log('Form Data:', formData);
        }
    };

    return (
        <Card className="bg-dark text-white border-dark">
            <CardHeader>
                <h5>Client Information</h5>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <p className='strong'>Buyers Information</p>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="buyerName" className="mb-3">
                                <Form.Label>Buyer Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter buyer name"
                                    value={formData.buyersInformation.buyerName}
                                    onChange={(e) => handleChange('buyersInformation', 'buyerName', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="buyerPhoneNumber" className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={formData.buyersInformation.phoneNumber}
                                    onChange={(e) => handleChange('buyersInformation', 'phoneNumber', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="buyerEmailAddress" className="mb-3">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email address"
                                    value={formData.buyersInformation.emailAddress}
                                    onChange={(e) => handleChange('buyersInformation', 'emailAddress', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="buyerCurrentAddress" className="mb-3">
                                <Form.Label>Current Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter current address"
                                    value={formData.buyersInformation.currentAddress}
                                    onChange={(e) => handleChange('buyersInformation', 'currentAddress', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="buyerNotes" className="mb-3">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter any additional notes"
                            value={formData.buyersInformation.notes}
                            onChange={(e) => handleChange('buyersInformation', 'notes', e.target.value)}
                        />
                    </Form.Group>

                    <br />
                    <h5>Seller Information</h5>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="sellerName" className="mb-3">
                                <Form.Label>Seller Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter seller name"
                                    value={formData.sellersInformation.sellerName}
                                    onChange={(e) => handleChange('sellersInformation', 'sellerName', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="sellerPhoneNumber" className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={formData.sellersInformation.phoneNumber}
                                    onChange={(e) => handleChange('sellersInformation', 'phoneNumber', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="sellerEmailAddress" className="mb-3">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email address"
                                    value={formData.sellersInformation.emailAddress}
                                    onChange={(e) => handleChange('sellersInformation', 'emailAddress', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="sellerCurrentAddress" className="mb-3">
                                <Form.Label>Current Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter current address"
                                    value={formData.sellersInformation.currentAddress}
                                    onChange={(e) => handleChange('sellersInformation', 'currentAddress', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="sellerNotes" className="mb-3">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter any additional notes"
                            value={formData.sellersInformation.notes}
                            onChange={(e) => handleChange('sellersInformation', 'notes', e.target.value)}
                        />
                    </Form.Group>

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
    );
}