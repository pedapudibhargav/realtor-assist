import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Form, Row, Col, Alert } from 'react-bootstrap';

export default function LegalRepresentation({ data, onChange }) {
    const [formData, setFormData] = useState(data);
    const [errors, setErrors] = useState([]);

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

    const handleCheckboxChange = () => {
        const updatedData = {
            ...formData,
            sameLawFirmRepresentingBothParties: !formData.sameLawFirmRepresentingBothParties,
            sellerLegalCounsel: {
                lawyerName: '',
                phoneNumber: '',
                emailAddress: '',
                lawFirm: '',
                notes: ''
            }
        };
        setFormData(updatedData);
        onChange(updatedData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!formData.buyerLegalCounsel.lawyerName) newErrors.push("Buyer's Lawyer Name is required.");
        if (!formData.buyerLegalCounsel.phoneNumber) newErrors.push("Buyer's Phone Number is required.");
        if (!formData.buyerLegalCounsel.emailAddress) newErrors.push("Buyer's Email Address is required.");
        if (!formData.buyerLegalCounsel.lawFirm) newErrors.push("Buyer's Law Firm is required.");

        if (!formData.sameLawFirmRepresentingBothParties) {
            if (!formData.sellerLegalCounsel.lawyerName) newErrors.push("Seller's Lawyer Name is required.");
            if (!formData.sellerLegalCounsel.phoneNumber) newErrors.push("Seller's Phone Number is required.");
            if (!formData.sellerLegalCounsel.emailAddress) newErrors.push("Seller's Email Address is required.");
            if (!formData.sellerLegalCounsel.lawFirm) newErrors.push("Seller's Law Firm is required.");
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
        } else {
            setErrors([]);
            console.log('Form Data:', {
                sameLawFirmRepresentingBothParties: formData.sameLawFirmRepresentingBothParties,
                buyerLegalCounsel: formData.buyerLegalCounsel,
                sellerLegalCounsel: formData.sameLawFirmRepresentingBothParties ? {} : formData.sellerLegalCounsel
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <h5>Legal Representation</h5>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="sameLawFirm" className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Same law firm representing both parties"
                            checked={formData.sameLawFirmRepresentingBothParties}
                            onChange={handleCheckboxChange}
                        />
                    </Form.Group>

                    <h5>Buyer's Legal Counsel</h5>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="buyerLawyerName" className="mb-3">
                                <Form.Label>Lawyer Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter lawyer name"
                                    value={formData.buyerLegalCounsel.lawyerName}
                                    onChange={(e) => handleChange('buyerLegalCounsel', 'lawyerName', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="buyerPhoneNumber" className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={formData.buyerLegalCounsel.phoneNumber}
                                    onChange={(e) => handleChange('buyerLegalCounsel', 'phoneNumber', e.target.value)}
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
                                    value={formData.buyerLegalCounsel.emailAddress}
                                    onChange={(e) => handleChange('buyerLegalCounsel', 'emailAddress', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="buyerLawFirm" className="mb-3">
                                <Form.Label>Law Firm</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter law firm"
                                    value={formData.buyerLegalCounsel.lawFirm}
                                    onChange={(e) => handleChange('buyerLegalCounsel', 'lawFirm', e.target.value)}
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
                            value={formData.buyerLegalCounsel.notes}
                            onChange={(e) => handleChange('buyerLegalCounsel', 'notes', e.target.value)}
                        />
                    </Form.Group>

                    {!formData.sameLawFirmRepresentingBothParties && (
                        <>
                            <h5>Seller's Legal Counsel</h5>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="sellerLawyerName" className="mb-3">
                                        <Form.Label>Lawyer Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter lawyer name"
                                            value={formData.sellerLegalCounsel.lawyerName}
                                            onChange={(e) => handleChange('sellerLegalCounsel', 'lawyerName', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="sellerPhoneNumber" className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter phone number"
                                            value={formData.sellerLegalCounsel.phoneNumber}
                                            onChange={(e) => handleChange('sellerLegalCounsel', 'phoneNumber', e.target.value)}
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
                                            value={formData.sellerLegalCounsel.emailAddress}
                                            onChange={(e) => handleChange('sellerLegalCounsel', 'emailAddress', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="sellerLawFirm" className="mb-3">
                                        <Form.Label>Law Firm</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter law firm"
                                            value={formData.sellerLegalCounsel.lawFirm}
                                            onChange={(e) => handleChange('sellerLegalCounsel', 'lawFirm', e.target.value)}
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
                                    value={formData.sellerLegalCounsel.notes}
                                    onChange={(e) => handleChange('sellerLegalCounsel', 'notes', e.target.value)}
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
                    <Button type="submit" variant="success">
                        Submit
                    </Button>
                </Form>
            </CardBody>
        </Card>
    );
}