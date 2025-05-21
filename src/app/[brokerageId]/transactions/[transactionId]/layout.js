'use client';
import AppNavigation from '@/components/navigation';
import { useRouter, usePathname, useParams } from 'next/navigation';
import React from 'react';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import './transaction_style.css';

export default function TransactionLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { transactionId, brokerageId } = useParams();

    const navLinks = [
        { label: 'Overview', route: `/${brokerageId}/transactions/${transactionId}`, iconClass: 'bi bi-house' },
        { label: 'Property Details', route: `/${brokerageId}/transactions/${transactionId}/property-details`, iconClass: 'bi bi-clipboard' },
        { label: 'Checklist', route: `/${brokerageId}/transactions/${transactionId}/checklist`, iconClass: 'bi bi-check2-square' },
        { label: 'Timeline', route: `/${brokerageId}/transactions/${transactionId}/timeline`, iconClass: 'bi bi-hourglass-split' },
        { label: 'Commission', route: `/${brokerageId}/transactions/${transactionId}/commission`, iconClass: 'bi bi-cash' },
        { label: 'Parties', route: `/${brokerageId}/transactions/${transactionId}/parties`, iconClass: 'bi bi-people' },
        { label: 'Documents', route: `/${brokerageId}/transactions/${transactionId}/documents`, iconClass: 'bi bi-file-earmark' },
    ];

    return (
        <>
            <Row className="layout-row agent-layout">
                <Col xs='2' className="px-0">
                    <div className='layout-left-nav'>
                        <div className='h3 mx-3'>AGENT EASE</div>
                        <hr />
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