"use client"
import React from 'react'
import AppNavigation from '@/components/navigation';
// pages/checklist.js
import { useState } from 'react';
import { Container, Row, Col, Button, Form, Badge, ProgressBar, Card } from 'react-bootstrap';

export default function Checklist() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');

  const docs = {
    purchaseFile: [
      { name: 'Purchase Agreement', status: 'Approved', mandatory: true, uploaded: true, comments: 2 },
      { name: 'Addendum', status: 'Approved', uploaded: true, comments: 1 },
      { name: 'Amendment', status: 'Approved', uploaded: true },
      { name: 'Waiver', status: 'Upload', due: 'Apr 30, 2025' }
    ],
    listingFile: [
      { name: 'Land Title', status: 'Pending Review', mandatory: true, uploaded: true, uploadedBy: 'John Agent', uploadedDate: 'Apr 27, 2025 2:30 PM' },
      { name: 'Consumer Relationship Guide', status: 'Changes Needed', mandatory: true, uploaded: true },
      { name: 'Copy of ID', status: 'Approved', uploaded: true },
      { name: 'Exclusive Seller Representation Agreement (D-A)', status: 'Upload', due: 'Apr 30, 2025', mandatory: true },
      { name: 'FINTRAC', status: 'Approved', mandatory: true, uploaded: true },
      { name: 'MLS Sheet', status: 'Upload', due: 'May 1, 2025' },
      { name: 'RMS Report', status: 'Upload', due: 'May 1, 2025', mandatory: true },
      { name: 'Care of Listing Broker', status: 'Upload', due: 'May 2, 2025' },
      { name: 'Dower Consent', status: 'Upload' }
    ]
  };

  const handleFileUpload = (e, docName) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [docName]: file.name }));
    }
  };

  const getBadge = (status, docName) => {
    if (status === 'Upload') {
      return (
        <div>
          <Form.Label htmlFor={`file-${docName}`} className="btn btn-sm btn-primary mb-0">Upload</Form.Label>
          <Form.Control type="file" id={`file-${docName}`} className="d-none" onChange={(e) => handleFileUpload(e, docName)} />
        </div>
      );
    }
    switch (status) {
      case 'Approved': return <Badge bg="success">Approved</Badge>;
      case 'Pending Review': return <Badge bg="warning" text="dark">Pending Review</Badge>;
      case 'Changes Needed': return <Button variant="danger" size="sm">Re-Upload</Button>;
      default: return null;
    }
  };

  const matchesStatus = (doc) => {
    if (statusFilter === 'All Statuses') return true;
    if (statusFilter === 'Complete') return doc.status === 'Approved';
    return doc.status === statusFilter;
  };

  const matchesSearch = (doc) => {
    return doc.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const renderDocs = (section, docsList) => {
    const readableCategory = section === 'purchaseFile' ? 'Purchase File' : 'Listing File';
    if (categoryFilter !== 'All Categories' && categoryFilter !== readableCategory) return null;
    const filtered = docsList.filter(d => matchesStatus(d) && matchesSearch(d));
    return (
      <Card className="mb-4 bg-white shadow-sm text-dark" >
        <Card.Header className="fs-6 fw-semibold"><strong>{readableCategory} - {section === 'purchaseFile' ? 'Residential' : 'Single Family'}</strong><span className="float-end text-dark">{filtered.length}/{docsList.length} Complete</span></Card.Header>
        <Card.Body className="text-dark">
          {filtered.length === 0 ? (
            <div className="text-center text-dark">No documents found</div>
          ) : (
            filtered.map((doc, i) => (
              <div key={i} className="d-flex justify-content-between align-items-center mb-3 fs-6">
                <div>
                  {doc.name} {uploadedFiles[doc.name] && <small className="text-dark">({uploadedFiles[doc.name]})</small>}
                  {doc.mandatory && <Badge bg="danger" className="me-2">Mandatory</Badge>}
                </div>
                <div>{getBadge(doc.status, doc.name)}</div>
              </div>
            ))
          )}
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
    <AppNavigation/>
    <Container fluid className="p-4 body-bg">
      <div className="bg-white shadow-sm rounded p-4 mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1 fw-bold fs-5">123 Main Street, Anytown CA 95123</h5>
          <div className="mb-2">Transaction #TR-2025-1042</div>
          <div className="d-flex align-items-center">
            <span className="me-2">Email docs to:</span>
            <code className="bg-light px-2 py-1 rounded">tr-1042@tradeEase-clone.com</code>
            <Button variant="light" size="sm" className="ms-2">Copy</Button>
          </div>
        </div>
        <div className="text-end">
          <div className="mb-1">14 of 24 documents complete</div>
          <div className="d-flex align-items-center">
            <ProgressBar now={58} className="me-2" style={{ width: 180, height: '8px' }} />
            <Badge bg="warning" text="light" className="rounded-pill px-3">Pending</Badge>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded p-3 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-2">
        <Form.Control
          placeholder="Search checklist..."
          className="bg-white border me-auto"
          style={{ maxWidth: '240px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="d-flex gap-2">
          <Form.Select className="bg-white border" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Complete</option>
            <option>Changes Needed</option>
            <option>Approved</option>
          </Form.Select>
          <Form.Select className="bg-white border" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option>All Categories</option>
            <option>Purchase File</option>
            <option>Listing File</option>
            <option>Buyer Clients</option>
          </Form.Select>
          <Button variant="primary" className='bulk-btn'>Bulk Upload</Button>
        </div>
      </div>

      <div className="mb-3 text-dark">Showing results: {docs.purchaseFile.concat(docs.listingFile).filter(d => matchesStatus(d) && matchesSearch(d)).length}</div>

      <Row>
        <Col md={6} className="pe-md-4 mb-4">
          {renderDocs('purchaseFile', docs.purchaseFile)}
          {renderDocs('listingFile', docs.listingFile)}
        </Col>

        <Col md={6} className="ps-md-4">
          <Card className="bg-white shadow-sm text-dark">
            <Card.Header>
              <div className="d-flex justify-content-between">
                <div>Document Preview</div>
                <Button size="sm" variant="link">Close</Button>
              </div>
            </Card.Header>
            <Card.Body className="text-center text-dark">
              <div className='upload-file'>

              Land Title.pdf
              </div>
              <div className="mt-3 fs-6 file-details">
                <div><strong>File Name:</strong> Land Title.pdf</div>
                <div><strong>Uploaded By:</strong> John Agent</div>
                <div><strong>Upload Date:</strong> Apr 27, 2025 2:30 PM</div>
                <div><strong>Status:</strong> Pending Review</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}
