import React from 'react';
import { Card } from 'react-bootstrap';
import './Timeline.css';

export default function Timeline({ items = [] }) {
  return (
    <div className="timeline-component">
      {items.length === 0 ? (
        <div className="text-muted">No activity yet.</div>
      ) : (
        <ul className="timeline-list list-unstyled mb-0">
          {items.map((item, idx) => (
            <li key={idx} className="d-flex mb-3 align-items-start timeline-item">
              <div className="timeline-dot-col">
                <div className={`timeline-line ${idx === 0 ? 'invisible' : ''}`}></div>
                <span className="timeline-dot" style={{ background: item.color || '#0d6efd' }}></span>
                <div className={`timeline-line ${idx === items.length - 1 ? 'invisible' : ''}`}></div>
              </div>
              <div>
                <div className="fw-semibold">{item.title}</div>
                <div className="small text-muted">{item.time}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}