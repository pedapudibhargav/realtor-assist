'use client'
import React, { useState } from 'react';
import AppNavigation from '@/components/navigation';
import { Container, Row, Col, Card, Button, Form, Table, Badge } from 'react-bootstrap';
import Timeline from '@/components/Timeline';

// Dummy data for transactions
const dummyTransactions = [
  { id: '1', address: '123 Main St', status: 'In Progress', closeDate: '2025-06-01', commission: 5000 },
  { id: '2', address: '456 Oak Ave', status: 'New', closeDate: '2025-06-15', commission: 3000 },
  { id: '3', address: '789 Pine Rd', status: 'Closing', closeDate: '2025-05-25', commission: 7000 },
  { id: '4', address: '321 Maple Dr', status: 'Closed', closeDate: '2025-04-30', commission: 4500 },
];

export default function AgentDashboard() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('closeDate');
  const [sortDir, setSortDir] = useState('asc');

  // Filter and sort logic
  const filtered = dummyTransactions.filter(t =>
    t.address.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'closeDate') {
      return sortDir === 'asc'
        ? new Date(a.closeDate) - new Date(b.closeDate)
        : new Date(b.closeDate) - new Date(a.closeDate);
    }
    if (sortBy === 'commission') {
      return sortDir === 'asc' ? a.commission - b.commission : b.commission - a.commission;
    }
    return 0;
  });

  // Overview stats (dummy)
  const overview = {
    active: 2,
    pending: 3,
    deadlines: 1,
    commission: 19500,
  };

  // Timeline data for recent activity
  const activityItems = [
    { title: 'Transaction 789 Pine Rd updated', time: '2 hours ago', color: '#0d6efd' },
    { title: 'Document uploaded for 123 Main St', time: 'Today, 9:15 AM', color: '#198754' },
    { title: 'Commission paid for 321 Maple Dr', time: 'Yesterday, 4:30 PM', color: '#fd7e14' },
    { title: 'New message from Broker', time: 'Yesterday, 2:10 PM', color: '#6f42c1' },
  ];

  // Performance stats (dummy, card style)
  const perfStats = [
    { title: 'Monthly Sales', value: '$15,000', note: 'Up 10% from last month', noteColor: 'text-success' },
    { title: 'Weekly Sales', value: '$5,000', note: 'Down 5% from last week', noteColor: 'text-danger' },
    { title: 'Leaderboard', value: '#2 in Team', note: 'Keep it up!', noteColor: 'text-primary' },
  ];

  return (
    <>
      <Container fluid className="p-4 body-bg">
        {/* Overview Cards */}
        <Row className="mb-4">
          <Col md={3}><Card className="text-center shadow-sm"><Card.Body><h6>Active Transactions</h6><h3>{overview.active}</h3></Card.Body></Card></Col>
          <Col md={3}><Card className="text-center shadow-sm"><Card.Body><h6>Pending Tasks</h6><h3>{overview.pending}</h3></Card.Body></Card></Col>
          <Col md={3}><Card className="text-center shadow-sm"><Card.Body><h6>Upcoming Deadlines</h6><h3>{overview.deadlines}</h3></Card.Body></Card></Col>
          <Col md={3}><Card className="text-center shadow-sm"><Card.Body><h6>Commission (MTD/YTD)</h6><h3>${overview.commission.toLocaleString()}</h3></Card.Body></Card></Col>
        </Row>

        {/* Performance Stats Row */}
        <Row className="mb-4">
          {perfStats.map((stat, idx) => (
            <Col md={4} key={idx}>
              <Card className="text-center shadow-sm mb-3">
                <Card.Body>
                  <div className="fw-bold mb-1">{stat.title}</div>
                  <div className="fs-4 mb-1">{stat.value}</div>
                  <div className={stat.noteColor}>{stat.note}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Quick Actions */}
        <Row className="mb-4">
          <Col><Button variant="primary" className="me-2">Add New Transaction</Button><Button variant="outline-secondary">Contact Support</Button></Col>
        </Row>

        {/* Main Transaction Table */}
        <Row>
          <Col md={8}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="d-flex align-items-center justify-content-between">
                <span className="fw-bold">Transactions</span>
                <Form.Control
                  type="text"
                  placeholder="Search by address..."
                  style={{ maxWidth: 220 }}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  size="sm"
                />
              </Card.Header>
              <Card.Body className="p-0">
                <Table hover responsive className="mb-0">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Status</th>
                      <th>
                        <Button variant="link" size="sm" onClick={() => {
                          setSortBy('closeDate');
                          setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                        }}>Close Date {sortBy === 'closeDate' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</Button>
                      </th>
                      <th>
                        <Button variant="link" size="sm" onClick={() => {
                          setSortBy('commission');
                          setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                        }}>Commission {sortBy === 'commission' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</Button>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(t => (
                      <tr key={t.id}>
                        <td>{t.address}</td>
                        <td><Badge bg={t.status === 'Closed' ? 'success' : t.status === 'In Progress' ? 'primary' : t.status === 'New' ? 'secondary' : 'warning'}>{t.status}</Badge></td>
                        <td>{t.closeDate}</td>
                        <td>${t.commission.toLocaleString()}</td>
                        <td><Button size="sm" variant="outline-primary">View</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          {/* Recent Activity Timeline */}
          <Col md={4}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="fw-bold">Recent Activity</Card.Header>
              <Card.Body>
                <Timeline items={activityItems} />
              </Card.Body>
            </Card>
            {/* Performance Stats as cards */}
            <Card className="shadow-sm mb-4">
              <Card.Header className="fw-bold">Upcoming Closings</Card.Header>
              <Card.Body>
                <ul className="list-unstyled mb-0">
                  <li>789 Pine Rd - May 25, 2025</li>
                  <li>123 Main St - Jun 1, 2025</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}