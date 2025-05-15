import React from 'react';
import { Card, CardBody, Form, Button, Row, Col } from 'react-bootstrap';
import '../checklist.css';

export default function ChecklistFilters({
  searchTerm,
  setSearchTerm,
  status,
  setStatus,
  category,
  setCategory,
  onBulkUpload,
}) {
  return (
    <Card className="bg-dark text-white border-dark mb-4">
      <CardBody>
        <Row className="align-items-center">
          {/* Left Column: Search Input */}
          <Col xs={12} md={6} className="mb-2 mb-md-0">
            <Form.Control
              type="text"
              placeholder="Search checklist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-dark checklist-search"
              style={{ maxWidth: '250px' }}
            />
          </Col>

          {/* Right Column: Filters and Button */}
          <Col xs={12} md={6} className="d-flex flex-wrap justify-content-md-end gap-2">
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white text-dark checklist-dropdown"
            >
              <option value="">All Statuses</option>
              <option value="complete">Complete</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </Form.Select>

            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white text-dark checklist-dropdown"
            >
              <option value="">All Categories</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </Form.Select>

            <Button
              variant="primary"
              className="checklist-button"
              onClick={onBulkUpload}
            >
              Bulk Upload
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
