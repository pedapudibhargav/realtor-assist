'use client';
import React, { useState } from 'react';
import { Card, Tabs, Tab, Form, InputGroup, Table, Button } from 'react-bootstrap';

const initialTemplates = {
  'Seller Representation': [
    { id: 1, name: 'Listing Agreement', status: true, mandatory: true },
    { id: 2, name: 'Property Disclosure', status: true, mandatory: false },
  ],
  'Buyer Representation': [
    { id: 3, name: 'Buyer Agency Agreement', status: true, mandatory: true },
    { id: 4, name: 'Offer to Purchase', status: false, mandatory: false },
  ],
  'Dual Agency': [
    { id: 5, name: 'Dual Agency Disclosure', status: true, mandatory: true },
  ],
};

export default function Templates() {
  const [checklistTemplate, setChecklistTemplate] = useState(initialTemplates);
  const [activeTab, setActiveTab] = useState('Seller Representation');
  const [search, setSearch] = useState('');
  const [draggedIdx, setDraggedIdx] = useState(null);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleSwitch = (docId, field) => {
    setChecklistTemplate((prev) => {
      const updated = { ...prev };
      updated[activeTab] = updated[activeTab].map((doc) =>
        doc.id === docId ? { ...doc, [field]: !doc[field] } : doc
      );
      console.log(updated);
      return updated;
    });
  };

  const handleDragStart = (idx) => setDraggedIdx(idx);
  const handleDragOver = (e, idx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    setChecklistTemplate((prev) => {
      const updated = { ...prev };
      const docs = [...updated[activeTab]];
      const [removed] = docs.splice(draggedIdx, 1);
      docs.splice(idx, 0, removed);
      updated[activeTab] = docs;
      console.log(updated);
      return updated;
    });
    setDraggedIdx(idx);
  };
  const handleDragEnd = () => setDraggedIdx(null);

  const handleAddDocument = () => {
    setChecklistTemplate((prev) => {
      const updated = { ...prev };
      const newId = Math.max(0, ...updated[activeTab].map(doc => doc.id)) + 1; // Generate a new ID
      updated[activeTab] = [
        ...updated[activeTab],
        { id: newId, name: 'New Document', status: true, mandatory: false },
      ];
      console.log('Added new document:', updated);
      return updated;
    });
  };

  const handleAction = (action, docId) => {
    if (action === 'delete') {
      setChecklistTemplate((prev) => {
        const updated = { ...prev };
        updated[activeTab] = updated[activeTab].filter((doc) => doc.id !== docId);
        console.log('Deleted document:', updated);
        return updated;
      });
    } else {
      // For now, just log other actions
      console.log(action, docId);
    }
  };

  const filteredDocs = checklistTemplate[activeTab] ? checklistTemplate[activeTab].filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  ) : [];

  return (
    <div>
      <Card>
        <Card.Header>
          <h4>Checklist Templates</h4>
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote">
            <p>
              Document templates define the required documents for different transaction types. These templates are applied across the entire brokerage and help ensure compliance and consistency. Set documents as "Mandatory" for required items that must be completed for each transaction.
            </p>
          </blockquote>
        </Card.Body>
      </Card>
      <br/>
      <Card>
        <Card.Header>
          <h5 className="mb-0">Transaction Templates</h5>
        </Card.Header>
        <Card.Body>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            {Object.keys(checklistTemplate).map((tab) => (
              <Tab eventKey={tab} title={tab} key={tab}>
                <InputGroup className="mb-3" style={{ maxWidth: 400 }}>
                  <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                  <Form.Control
                    placeholder="Search Documents..."
                    value={search}
                    onChange={handleSearch}
                  />
                </InputGroup>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}></th>
                      <th>Document Name</th>
                      <th>Status</th>
                      <th>Mandatory</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocs.length > 0 ? filteredDocs.map((doc, idx) => (
                      <tr
                        key={doc.id}
                        draggable
                        onDragStart={() => handleDragStart(idx)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDragEnd={handleDragEnd}
                        style={{ cursor: 'move' }}
                      >
                        <td style={{ textAlign: 'center', cursor: 'grab' }}>
                          <span
                            style={{ cursor: 'grab' }}
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <i className="bi bi-grip-vertical"></i>
                          </span>
                        </td>
                        <td>{doc.name}</td>
                        <td>
                          <Form.Check
                            type="switch"
                            checked={doc.status}
                            onChange={() => handleSwitch(doc.id, 'status')}
                          />
                        </td>
                        <td>
                          <Form.Check
                            type="switch"
                            checked={doc.mandatory}
                            onChange={() => handleSwitch(doc.id, 'mandatory')}
                          />
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleAction('edit', doc.id)}
                            className="me-2"
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleAction('preview', doc.id)}
                            className="me-2"
                          >
                            <i className="bi bi-eye"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleAction('delete', doc.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    )) : []}
                  </tbody>
                </Table>
                <Button className="w-100 mt-3" variant="success" onClick={handleAddDocument}>
                  + Add Document
                </Button>
              </Tab>
            ))}
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
}