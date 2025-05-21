// components/Dashboard/QueueRow.js
import React from 'react';
import { Button } from 'react-bootstrap';

const QueueRow = ({ doc, onAction }) => {
  return (
    <tr className="align-middle">
      <td>
        <div className="d-flex align-items-start">
          <i className="bi bi-file-earmark-text fs-5 text-primary me-2"></i>
          <div>
            <div className="fw-medium">{doc.title}</div>
            <div className="text-muted small">{doc.mls}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="fw-medium">{doc.property}</div>
      </td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-secondary rounded-circle text-uppercase" style={{ width: '30px', height: '30px', lineHeight: '20px' }}>
            {doc.agentInitials}
          </span>
          <span className="small">{doc.agent}</span>
        </div>
      </td>
      <td>
        <div className="small text-muted">{doc.date}</div>
      </td>
      <td>
        <span className={`badge rounded-pill bg-${doc.priorityColor} text-white text-capitalize`}>
          {doc.priority}
        </span>
      </td>
      <td>
        <span className={`badge rounded-pill bg-light border text-dark`}>
          {doc.status}
        </span>
      </td>
      <td>
        <Button
          variant={doc.actionLabel === 'View' ? 'outline-secondary' : 'primary'}
          size="sm"
          onClick={() => onAction(doc.id)}
        >
          {doc.actionLabel}
        </Button>
      </td>
    </tr>
  );
};

export default QueueRow;
