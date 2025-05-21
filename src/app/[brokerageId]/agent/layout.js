// Agent section layout with sidebar navigation
'use client';
import Link from 'next/link';
import AppNavigation from '@/components/navigation';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import '../../global.scss';
import '../conveyancer/conveyancer.css';

export default function AgentLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { brokerageId } = useParams();

  const navLinks = [
    { label: 'Dashboard', route: `/${brokerageId}/agent`, iconClass: 'bi bi-speedometer2' },
    { label: 'Transactions', route: `/${brokerageId}/agent/transactions`, iconClass: 'bi bi-files' },
  ];

  return (
    <Row className="layout-row conveyancer-layout">
      <Col xs='2' className="px-0">
        <div className='layout-left-nav'>
          <div className='h3 mx-3'>AGENT EASE</div>
          <hr/>
          <Nav className="flex-column">
            {navLinks.map(({ label, route, iconClass }) => (
              <Nav.Link
                key={route}
                className={pathname === route ? "active" : ''}
                onClick={() => router.push(route)}
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
