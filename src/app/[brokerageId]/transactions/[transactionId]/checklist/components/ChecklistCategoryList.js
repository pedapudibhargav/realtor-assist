import React from 'react';
import ChecklistGroup from './ChecklistGroup';
import { Card } from 'react-bootstrap';

export default function ChecklistCategoryList({ categories }) {
  return (
    <div className="checklist-category-list">
      {categories.map((category) => (
        <Card className="mb-4" key={category.id}>
          <Card.Header className="fw-bold d-flex justify-content-between">
            <span>{category.title}</span>
            <span>{category.completed}/{category.total} Complete</span>
          </Card.Header>
          <Card.Body className="p-0">
            <ChecklistGroup
              documents={category.documents}
              onUpload={category.onUpload}
              onAssign={category.onAssign}
              onView={category.onView}
              onReupload={category.onReupload}
            />
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
