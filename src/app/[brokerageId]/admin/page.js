'use client';
import AppNavigation from '@/components/navigation';
import { useRouter, useParams } from 'next/navigation';
import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

const statCards = [
  { title: 'Active Users', value: 42, note: '↑ 5% this week', noteColor: 'text-success' },
  { title: 'Pending Invites', value: 7, note: '↓ 2% this week', noteColor: 'text-danger' },
  { title: 'Teams', value: 5, note: 'No change', noteColor: 'text-muted' },
  { title: 'Roles', value: 4, note: 'No change', noteColor: 'text-muted' },
];

const recentActivity = [
  { icon: 'bi-person-plus text-success', text: 'Invited new user: Jane Doe', time: '10 min ago' },
  { icon: 'bi-people text-primary', text: 'Created new team: Marketing', time: '1 hour ago' },
  { icon: 'bi-person-badge text-warning', text: 'Updated role: Conveyancer', time: '2 hours ago' },
  { icon: 'bi-gear text-info', text: 'Changed brokerage settings', time: 'Yesterday' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { brokerageId } = useParams();

  // Handlers for quick actions
  const handleInviteUser = () => router.push(`/${brokerageId}/admin/users/add`);
  const handleCreateTeam = () => router.push(`/${brokerageId}/admin/teams/add`);
  const handleViewReports = () => router.push(`/${brokerageId}/admin/reports`);

  return (
    <>
      <h1 className="fw-bold mb-4">Admin Dashboard</h1>
      <Row className="g-3 mb-4">
        {statCards.map((card, i) => (
          <Col md={6} key={i}>
            <Card>
              <Card.Body className="p-4">
                <div className="stat-title fw-bold mb-2">{card.title}</div>
                <div className="stat-value mb-2">{card.value}</div>
                <div className={`stat-note d-flex align-items-center gap-2 ${card.noteColor}`}>{card.note}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Card className="mb-4">
        <Card.Header className="fw-bold d-flex justify-content-between">Quick Actions</Card.Header>
        <Card.Body className="d-flex gap-3">
          <Button variant="primary" onClick={handleInviteUser}>
            <i className="bi bi-person-plus me-2"></i>Invite User
          </Button>
          <Button variant="primary" onClick={handleCreateTeam}>
            <i className="bi bi-people me-2"></i>Create Team
          </Button>
          <Button variant="primary" onClick={handleViewReports}>
            <i className="bi bi-bar-chart me-2"></i>View Reports
          </Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header className="fw-bold d-flex justify-content-between">Recent Activity</Card.Header>
        <Card.Body className="p-4">
          {recentActivity.map((item, i) => (
            <div key={i} className="d-flex align-items-start gap-2 py-2">
              <i className={`bi ${item.icon} fs-5`}></i>
              <div>
                <div className="small fw-medium">{item.text}</div>
                <div className="text-muted small">{item.time}</div>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>
    </>
  );
}