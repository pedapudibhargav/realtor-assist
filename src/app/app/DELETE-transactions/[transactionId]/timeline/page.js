'use client';
import React, { useState } from 'react';
import { Card, CardBody, Form, Row, Col, Button } from 'react-bootstrap';

const defaultTimelines = {
  offerAcceptedDate: '2025-05-01',
  earnestMoneyDueDate: '2025-05-03',
  inspectionDeadline: '2025-05-07',
  appraisalDeadline: '2025-05-10',
  financingApprovalDeadline: '2025-05-12',
  closingDate: '2025-05-20',
};

export default function TimelinePage() {
  const [timelines, setTimelines] = useState(defaultTimelines);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimelines((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Timeline Data:', timelines);
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <h4 className="mb-4">Transaction Timeline</h4>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="offerAcceptedDate">
                <Form.Label>Offer Accepted Date</Form.Label>
                <Form.Control
                  type="date"
                  name="offerAcceptedDate"
                  value={timelines.offerAcceptedDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="earnestMoneyDueDate">
                <Form.Label>Earnest Money Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="earnestMoneyDueDate"
                  value={timelines.earnestMoneyDueDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="inspectionDeadline">
                <Form.Label>Inspection Deadline</Form.Label>
                <Form.Control
                  type="date"
                  name="inspectionDeadline"
                  value={timelines.inspectionDeadline}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="appraisalDeadline">
                <Form.Label>Appraisal Deadline</Form.Label>
                <Form.Control
                  type="date"
                  name="appraisalDeadline"
                  value={timelines.appraisalDeadline}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="financingApprovalDeadline">
                <Form.Label>Financing Approval Deadline</Form.Label>
                <Form.Control
                  type="date"
                  name="financingApprovalDeadline"
                  value={timelines.financingApprovalDeadline}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="closingDate">
                <Form.Label>Closing Date</Form.Label>
                <Form.Control
                  type="date"
                  name="closingDate"
                  value={timelines.closingDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="text-end mt-4">
            <Button type="submit" variant="success">Save Timeline</Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
