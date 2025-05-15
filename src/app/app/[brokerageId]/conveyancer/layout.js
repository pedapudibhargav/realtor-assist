'use client';
import AppNavigation from '@/components/navigation';
import { useRouter, usePathname, useParams } from 'next/navigation';
import React from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import './conveyancer.css';

export default function ConveyancerLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { brokerageId } = useParams();

    const navLinks = [
        { label: 'Dashboard', route: `/app/${brokerageId}/conveyancer/dashboard`, iconClass: 'bi bi-speedometer2' },
        { label: 'Document Queue', route: `/app/${brokerageId}/conveyancer/document-queue`, iconClass: 'bi bi-inbox' },
        { label: 'Approvals', route: `/app/${brokerageId}/conveyancer/approvals`, iconClass: 'bi bi-patch-check' },
        { label: 'Transactions', route: `/app/${brokerageId}/conveyancer/transactions`, iconClass: 'bi bi-files' },
        { label: 'Agents', route: `/app/${brokerageId}/conveyancer/agents`, iconClass: 'bi bi-person-badge' },
        { label: 'Templates', route: `/app/${brokerageId}/conveyancer/templates`, iconClass: 'bi bi-file-earmark-text' },
        { label: 'Reports', route: `/app/${brokerageId}/conveyancer/reports`, iconClass: 'bi bi-bar-chart' },
    ];

    return (
        <>
            <Row className="layout-row conveyancer-layout">
                <Col xs='2' className="px-0">
                    <div className='layout-left-nav'>
                        <div className='text-white h3 mx-3'>AGENT EASE</div>
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
        </>
    );
}