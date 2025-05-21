import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Form, Row, Col, Alert } from 'react-bootstrap';

export default function OtherParties({ data, onChange }) {
    const [parties, setParties] = useState(data);
    const [errors, setErrors] = useState([]);

    const handleAddParty = () => {
        const updatedParties = [...parties, {
            partyType: '',
            name: '',
            phoneNumber: '',
            emailAddress: '',
            company: '',
            notes: ''
        }];
        setParties(updatedParties);
        onChange(updatedParties);
    };

    const handleRemoveParty = (index) => {
        const updatedParties = parties.filter((_, i) => i !== index);
        setParties(updatedParties);
        onChange(updatedParties);
    };

    const handleChange = (index, field, value) => {
        const updatedParties = [...parties];
        updatedParties[index][field] = value;
        setParties(updatedParties);
        onChange(updatedParties);
    };

    const handleSave = () => {
        const newErrors = [];
        parties.forEach((party, index) => {
            if (!party.partyType) newErrors.push(`Party Type is required for party ${index + 1}.`);
            if (!party.name) newErrors.push(`Name is required for party ${index + 1}.`);
        });

        if (newErrors.length > 0) {
            setErrors(newErrors);
        } else {
            setErrors([]);
            console.log('Additional Parties:', parties);
        }
    };

    return (
        <Card>
            <CardHeader>
                <h5>Other Parties</h5>
            </CardHeader>
            <CardBody>
                {parties.length === 0 && (
                    <p>No additional Parties added. Click 'Add Party' to include other stakeholders like mortgage brokers, home inspectors, etc..</p>
                )}
                {parties.map((party, index) => (
                    <div key={index} className="mb-4">
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId={`partyType-${index}`} className="mb-3">
                                    <Form.Label>Party Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={party.partyType}
                                        onChange={(e) => handleChange(index, 'partyType', e.target.value)}
                                    >
                                        <option value="">Select party type</option>
                                        <option value="Apprisal Company">Apprisal Company</option>
                                        <option value="Buyer">Buyer</option>
                                        <option value="Buyer Lawyer">Buyer Lawyer</option>
                                        <option value="Buying Agent">Buying Agent</option>
                                        <option value="Buying Broker">Buying Broker</option>
                                        <option value="Condo Association/HOA">Condo Association/HOA</option>
                                        <option value="Escrow Company">Escrow Company</option>
                                        <option value="General">General</option>
                                        <option value="Landloard">Landloard</option>
                                        <option value="Mortgage Appraiser">Mortgage Appraiser</option>
                                        <option value="Mortgage Company">Mortgage Company</option>
                                        <option value="Seller">Seller</option>
                                        <option value="Seller Lawyer">Seller Lawyer</option>
                                        <option value="Selling Agent">Selling Agent</option>
                                        <option value="Selling Broker">Selling Broker</option>
                                        <option value="Tenant">Tenant</option>
                                        <option value="Title Company">Title Company</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId={`name-${index}`} className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={party.name}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId={`phoneNumber-${index}`} className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter phone number"
                                        value={party.phoneNumber}
                                        onChange={(e) => handleChange(index, 'phoneNumber', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId={`emailAddress-${index}`} className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email address"
                                        value={party.emailAddress}
                                        onChange={(e) => handleChange(index, 'emailAddress', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId={`company-${index}`} className="mb-3">
                                    <Form.Label>Company / Organization</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter company or organization"
                                        value={party.company}
                                        onChange={(e) => handleChange(index, 'company', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId={`notes-${index}`} className="mb-3">
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter any additional notes"
                                        value={party.notes}
                                        onChange={(e) => handleChange(index, 'notes', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="danger" onClick={() => handleRemoveParty(index)}>
                            Remove Party
                        </Button>
                        <hr />
                    </div>
                ))}
                {errors.length > 0 && (
                    <Alert variant="danger">
                        {errors.map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </Alert>
                )}
                <Button variant="primary" onClick={handleAddParty} className="me-2">
                    + Add Party
                </Button>
                <Button variant="success" onClick={handleSave}>
                    Save
                </Button>
            </CardBody>
        </Card>
    );
}