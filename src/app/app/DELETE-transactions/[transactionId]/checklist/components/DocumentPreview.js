import React from 'react';
import FileInfo from './FileInfo';
import FileActions from './FileActions';
import CommentSection from './CommentSection';
import '../checklist.css';

export default function DocumentPreview({ document, onDownload, onReplace, onSubmitComment, onClose }) {
  if (!document) return null;

  return (
    <div className="document-preview card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong>Document Preview</strong>
        <button className="btn-close" onClick={onClose} aria-label="Close"></button>
      </div>

      <div className="card-body">
        <div className="file-preview-box mb-3 d-flex align-items-center justify-content-center text-black border bg-light">
          {document.name}
        </div>

        <FileInfo document={document} />
        <FileActions onDownload={onDownload} onReplace={onReplace} />
        <hr />
        <CommentSection comments={document.comments || []} onSubmit={onSubmitComment} />
      </div>
    </div>
  );
}
