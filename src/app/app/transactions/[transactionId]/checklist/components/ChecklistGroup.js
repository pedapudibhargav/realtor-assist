import React from 'react';
import ChecklistRecord from './ChecklistRecord';

export default function ChecklistGroup({ documents, onUpload, onAssign, onView, onReupload }) {
  return (
    <div className="checklist-group">
      {documents.map((item) => (
        <ChecklistRecord
          key={item.id}
          item={item}
          onUpload={onUpload}
          onAssign={onAssign}
          onView={onView}
          onReupload={onReupload}
        />
      ))}
    </div>
  );
}
