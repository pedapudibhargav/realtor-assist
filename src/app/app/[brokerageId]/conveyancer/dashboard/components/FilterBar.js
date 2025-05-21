// components/Dashboard/FilterBar.js
import React from 'react';
import { Card, CardBody, Form, Button, Row, Col } from 'react-bootstrap';
import '../dashboard.css';

export default function FilterBar({
  status,
  setStatus,
  type,
  setType,
  priority,
  setPriority,
  onViewChange,
  currentView
}) {
  return (
    <Card className="border-0 shadow-sm mb-4">
      <CardBody>
        <Row className="align-items-center flex-wrap gap-3">
        <Col md="auto" className='d-flex gap-2'>
            <div className="fw-semibold">Status:</div>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white text-dark checklist-dropdown"
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Under Review</option>
            </Form.Select>
          </Col>

          <Col md="auto" className='d-flex gap-2'>
            <div className="fw-semibold">Document Type:</div>
            <Form.Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-white text-dark checklist-dropdown"
            >
              <option>All Documents</option>
              <option>Contracts</option>
              <option>Reports</option>
              <option>Deeds</option>
            </Form.Select>
          </Col>

          <Col md="auto" className='d-flex gap-2'>
            <div className="fw-semibold">Priority:</div>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-white text-dark checklist-dropdown"
            >
              <option>All Priorities</option>
              <option>Urgent</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Form.Select>
          </Col>

          <Col className="d-flex gap-2 justify-content-end flex-grow-1 mt-2 mt-md-0">
            <Button
              variant={currentView === 'my' ? 'primary' : 'outline-secondary'}
              onClick={() => onViewChange('my')}
            >
              My Queue
            </Button>
            <Button
              variant={currentView === 'team' ? 'primary' : 'outline-secondary'}
              onClick={() => onViewChange('team')}
            >
              Team Queue
            </Button>
            <Button
              variant={currentView === 'all' ? 'primary' : 'outline-secondary'}
              onClick={() => onViewChange('all')}
            >
              All Documents
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
