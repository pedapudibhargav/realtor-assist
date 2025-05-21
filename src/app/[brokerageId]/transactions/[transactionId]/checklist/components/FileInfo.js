import React from 'react';

export default function FileInfo({ document }) {
  return (
    <div className="mb-3 small">
      <div><strong>File Name:</strong> {document.file}</div>
      <div><strong>Uploaded By:</strong> {document.uploadedBy}</div>
      <div><strong>Upload Date:</strong> {document.uploadedAt}</div>
      <div><strong>Status:</strong> {document.status}</div>
    </div>
  );
}
