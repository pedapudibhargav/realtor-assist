import React from 'react';
import { Button } from 'react-bootstrap';

export default function FileActions({ onDownload, onReplace }) {
  return (
    <div className="d-flex flex-wrap gap-3">
      <Button
        variant="outline-primary"
        className="flex-fill"
        style={{ flexBasis: '0' }}
        onClick={onDownload}
      >
        Download
      </Button>
      <Button
        variant="outline-primary"
        className="flex-fill"
        style={{ flexBasis: '0' }}
        onClick={onReplace}
      >
        Replace
      </Button>
    </div>
  );
}
