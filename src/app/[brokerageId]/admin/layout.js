'use client';
import React from 'react';
import AppNavigation from '@/components/navigation';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { Row, Col, Nav } from 'react-bootstrap';

const navLinks = [
  { label: 'Dashboard', route: 'dashboard', iconClass: 'bi bi-speedometer2' },
  { label: 'Users', route: 'users', iconClass: 'bi bi-people' },
  { label: 'Teams', route: 'teams', iconClass: 'bi bi-people-fill' },
  { label: 'Roles', route: 'roles', iconClass: 'bi bi-person-badge' },
  { label: 'Reports', route: 'reports', iconClass: 'bi bi-bar-chart' },
  { label: 'Settings', route: 'settings', iconClass: 'bi bi-gear' },
  { label: 'Activity Log', route: 'activity-log', iconClass: 'bi bi-clock-history' },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { brokerageId } = useParams();

  const handleNav = (route) => router.push(`/${brokerageId}/admin/${route === 'dashboard' ? '' : route}`);

  return (
    <Row className="layout-row conveyancer-layout">
      <Col xs='2' className="px-0">
        <div className='layout-left-nav'>
          <div className='h3 mx-3'>ADMIN</div>
          <hr />
          <Nav className="flex-column">
            {navLinks.map(({ label, route, iconClass }) => (
              <Nav.Link
                key={route}
                className={pathname.endsWith(`/admin${route === 'dashboard' ? '' : '/' + route}`) ? 'active' : ''}
                onClick={() => handleNav(route)}
              >
                <i className={iconClass}></i>
                <span className="nav-ele-lable">{label}</span>
              </Nav.Link>
            ))}
          </Nav>
        </div>
      </Col>
      <Col xs='10'>
        <AppNavigation />
        <div className="layout-body">
          {children}
        </div>
      </Col>
    </Row>
  );
}
