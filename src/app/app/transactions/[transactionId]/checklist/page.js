'use client';
import React, { useState, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import ChecklistDetails from './components/ChecklistDetails';
import ChecklistFilters from './components/ChecklistFilters';
import ChecklistCategoryList from './components/ChecklistCategoryList';
import { groupedData } from './constants/sampleData';
import DocumentPreview from './components/DocumentPreview';
export default function ChecklistPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null); 

  // Handlers
  const handleUpload = (doc) => alert(`Upload: ${doc.name}`);
  const handleAssign = (doc) => alert(`Assign: ${doc.name}`);
  const handleReupload = (doc) => alert(`Re-upload: ${doc.name}`);
  const handleView = (doc) => setSelectedDocument(doc); 

  const handleDownload = () => alert(`Download: ${selectedDocument?.name}`);
  const handleReplace = () => alert(`Replace: ${selectedDocument?.name}`);
  const handleSubmitComment = (comment) =>
    alert(`New comment on ${selectedDocument?.name}: ${comment}`);
  const handleClosePreview = () => setSelectedDocument(null); 

  // Apply filters and inject handlers
  const categoriesWithHandlers = groupedData
    .filter((cat) => (category ? cat.id === category : true))
    .map((cat) => {
      const filteredDocs = cat.documents.filter((doc) => {
        const matchSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = status ? doc.status === status : true;
        return matchSearch && matchStatus;
      });

      return {
        ...cat,
        documents: filteredDocs,
        completed: filteredDocs.filter((doc) => doc.status === 'complete').length,
        total: filteredDocs.length,
        onUpload: handleUpload,
        onAssign: handleAssign,
        onView: handleView, 
        onReupload: handleReupload,
      };
    });

  const handleBulkUpload = () => {
    alert('Bulk upload clicked');
  };

  return (
    <div className='checklist'>
      <ChecklistDetails />

      <ChecklistFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        status={status}
        setStatus={setStatus}
        category={category}
        setCategory={setCategory}
        onBulkUpload={handleBulkUpload}
      />

      <Row className="align-items-start g-4 justify-content-between">
        <Col xs={12} md={8}>
          {categoriesWithHandlers.length > 0 ? (
            <ChecklistCategoryList categories={categoriesWithHandlers} />
          ) : (
            <div className="text-muted">No results found.</div>
          )}
        </Col>

        <Col xs={12} md={4}>
          <DocumentPreview
            document={selectedDocument}
            onDownload={handleDownload}
            onReplace={handleReplace}
            onSubmitComment={handleSubmitComment}
            onClose={handleClosePreview}
          />
        </Col>
      </Row>
    </div>
  );
}
