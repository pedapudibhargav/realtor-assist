
"use client";
import { useState } from 'react';
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import StatsCard from './components/StatsCard';
import FilterBar from './components/FilterBar';
import QueueRow from './components/QueueRow';
import RecentActivityItem from './components/RecentActivityItem';
import DeadlineItem from './components/DeadlineItem';

export default function Dashboard() {
  const [filters, setFilters] = useState({ status: 'All Statuses', type: 'All Documents', priority: 'All Priorities' });

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const mockDocs = [
    { id: 1, title: 'Sale Contract - Buyer', mls: '#12345678', property: '123 Main St', agent: 'John Davis', agentInitials: 'JD', date: 'May 02, 2025', priority: 'Urgent', priorityColor: 'danger', status: 'Pending Review', actionLabel: 'Review Now' },
    { id: 2, title: 'Title Deed', mls: '#87654321', property: '457 Oakwood Dr', agent: 'Emma Roberts', agentInitials: 'ER', date: 'May 01, 2025', priority: 'High', priorityColor: 'warning', status: 'Under Review', actionLabel: 'Continue' },
    { id: 3, title: 'Mortgage Document', mls: '#56784321', property: '789 Birch Ave', agent: 'Michael Chen', agentInitials: 'MC', date: 'Apr 30, 2025', priority: 'Medium', priorityColor: 'success', status: 'Pending Review', actionLabel: 'Review Now' },
    { id: 4, title: 'Survey Report', mls: '#98765432', property: '321 Pine St', agent: 'Aria Smith', agentInitials: 'AS', date: 'Apr 30, 2025', priority: 'Low', priorityColor: 'secondary', status: 'Approved', actionLabel: 'View' },
    { id: 5, title: 'Property Disclosure', mls: '#43218765', property: '567 Cedar Lane', agent: 'Brian Williams', agentInitials: 'BW', date: 'Apr 29, 2025', priority: 'High', priorityColor: 'warning', status: 'Rejected', actionLabel: 'View' }
  ];

  const filteredDocs = mockDocs.filter(doc => {
    const matchesStatus = filters.status === 'All Statuses' || doc.status === filters.status;
    const matchesPriority = filters.priority === 'All Priorities' || doc.priority === filters.priority;
    return matchesStatus && matchesPriority;
  });

  return (
    <div fluid >
      <h4 className="fw-bold mb-4">Document Review Dashboard</h4>

      <Row className="g-3 mb-4">
        <Col md={6}><StatsCard title="Documents Pending Review" value="42" note="↑ 12% from last week" noteColor="text-success" /></Col>
        <Col md={6}><StatsCard title="Documents Reviewed Today" value="18" note="↑ 8% from yesterday" noteColor="text-success" /></Col>
        <Col md={6}><StatsCard title="Documents Requiring Attention" value="7" note="↓ 3% from last week" noteColor="text-danger" /></Col>
        <Col md={6}><StatsCard title="Average Review Time" value="25m" note="↑ 5% improvement" noteColor="text-success" /></Col>
      </Row>

      <FilterBar
        status={filters.status}
        type={filters.type}
        priority={filters.priority}
        onChange={handleFilterChange}
      />

      <Card className="mb-4">
        <Card.Header className="fw-bold d-flex justify-content-between">Document Review Queue</Card.Header>
        <h6 className="fw-semibold mb-3"></h6>
        <Table hover responsive className="mb-0">
          <thead>
            <tr className="text-muted small">
              <th>Document</th>
              <th>Property</th>
              <th>Agent</th>
              <th>Submitted</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map(doc => <QueueRow key={doc.id} doc={doc} onAction={() => alert(`Action: ${doc.title}`)} />)}
          </tbody>
        </Table>
      </Card>

      <Row className="g-4">
        <Col md={6}>
          <div className="bg-dark text-white shadow-sm rounded p-3">
            <h6 className="fw-semibold mb-3">Recent Activity</h6>
            <RecentActivityItem icon="bi-check-circle text-success" text="You approved a Title Deed document" time="20 minutes ago" address="321 Pine Street" />
            <RecentActivityItem icon="bi-chat-left-text text-primary" text="You added a comment on Mortgage Document" time="1 hour ago" address="789 Birch Avenue" />
            <RecentActivityItem icon="bi-x-circle text-danger" text="You rejected a Property Disclosure document" time="3 hours ago" address="567 Cedar Lane" />
            <RecentActivityItem icon="bi-upload text-info" text="John Davis uploaded a new Sale Contract" time="Yesterday" address="123 Main Street" />
          </div>
        </Col>
        <Col md={6}>
          <div className="bg-dark text-white shadow-sm rounded p-3">
            <h6 className="fw-semibold mb-3">Upcoming Deadlines</h6>
            <DeadlineItem text="Closing Deadline for 123 Main Street" date="Tomorrow, 3:00 PM" />
            <DeadlineItem text="Document Submission for 457 Oakwood Drive" date="May 5, 2025" />
            <DeadlineItem text="Mortgage Approval for 789 Birch Avenue" date="May 10, 2025" />
          </div>
        </Col>
      </Row>
    </div>
  );
}