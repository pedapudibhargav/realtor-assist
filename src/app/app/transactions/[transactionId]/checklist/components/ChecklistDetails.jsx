import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, ProgressBar,Badge  } from 'react-bootstrap';

export default function ChecklistDetails() {
  return (
    <Card className="bg-dark text-white border-dark mb-4">
    <CardBody className='row align-items-center'>
        <div className="col-12 col-md-6">
            <h4>123 Main Street, Anytown CA 95123</h4>
            <p><span>Transaction </span> <span>#TR-2025-1042</span></p>
            <p className='mb-0'>
                <span className="me-1 d-inline-block">Email docs to:</span>
                <code className="bg-light px-2 py-1 rounded me-2">tr-1042@tradeEase-clone.com</code>
                <Button variant="light" className="ms-2" size="sm"> Copy</Button>
            </p>
        </div>
        <div className="col-12 col-md-6">
            <div className="d-flex gap-3 justify-content-end">
                <div className="mb-1">14 of 24 documents complete</div>
                <div className="d-flex align-items-center">
                    <ProgressBar now={58} className="me-2" style={{ width: 180, height: '8px' }} />
                    <Badge bg="warning" text="light" className="rounded-pill px-3">Pending</Badge>
                </div>
            </div>
        </div>
    </CardBody>
</Card>
  )
}
