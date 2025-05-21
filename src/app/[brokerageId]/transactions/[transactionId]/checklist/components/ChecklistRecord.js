import React from 'react';
import { Button, Badge, Form } from 'react-bootstrap';
import {
  REQUIREMENT_TYPE,
  STATUS,
  ACTION_LABELS,
  STATUS_BADGE_VARIANTS,
} from '../constants/checklistEnums';
import '../checklist.css';

export default function ChecklistRecord({
  item,
  onUpload,
  onAssign,
  onView,
  onReupload,
}) {
  return (
    <div className={`checklist-record ${item.highlight ? 'highlighted' : ''}`}>
      <div className="d-flex align-items-start gap-2">
        <Form.Check
          checked={item.checked}
          onChange={() => item.onCheck?.(item)}
          className="mt-1"
        />

        <div className="flex-grow-1">
          {/* Checklist name and status */}
          <div className="fw-semibold">{item.name}</div>

          {/* Required/Optional + Date */}
          <div className="text-muted small">
            {item.required ? REQUIREMENT_TYPE.REQUIRED : REQUIREMENT_TYPE.OPTIONAL}
            {' '}
            {item.uploadedDate
              ? `Uploaded: ${item.uploadedDate}`
              : item.dueDate
                ? `Due: ${item.dueDate}`
                : ''}
          </div>

          {/* Comments */}
          {item.comments && (
            <div
              className={`checklist-comment d-flex align-items-center gap-1 mt-1 ${item.status === STATUS.CHANGES_NEEDED
                  ? 'text-danger'
                  : item.status === STATUS.PENDING_REVIEW
                    ? 'text-warning'
                    : 'text-muted'
                }`}
            >
              <i className="bi bi-chat-left-text"></i>
              <span>{item.comments}</span>
            </div>
          )}


        </div>

        <div className="d-flex align-items-center flex-wrap gap-2 justify-content-end mt-2">
          {/* Status Badge */}
          {item.status && (
            <Badge
              bg={STATUS_BADGE_VARIANTS[item.status] || 'secondary'}
              className="checklist-badge"
            >
              {item.status}
            </Badge>
          )}

          {/* Action Buttons */}
          {item.status === STATUS.CHANGES_NEEDED && (
            <Button
              variant="primary"
              size="sm"
              className="checklist-btn"
              onClick={() => onReupload(item)}
            >
              {ACTION_LABELS.REUPLOAD}
            </Button>
          )}

          {(item.status === STATUS.APPROVED || item.status === STATUS.PENDING_REVIEW) && (
            <Button
              variant="light"
              size="sm"
              className="checklist-btn"
              onClick={() => onView(item)}
            >
              {ACTION_LABELS.VIEW}
            </Button>
          )}

          {!item.status && (
            <>
              <Button
                variant="primary"
                size="sm"
                className="checklist-btn"
                onClick={() => onUpload(item)}
              >
                {ACTION_LABELS.UPLOAD}
              </Button>
              <Button
                variant="light"
                size="sm"
                className="checklist-btn"
                onClick={() => onAssign(item)}
              >
                {ACTION_LABELS.ASSIGN}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
