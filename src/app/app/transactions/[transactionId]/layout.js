'use client';
import AppNavigation from '@/components/navigation';
import { useRouter, usePathname, useParams } from 'next/navigation';
import React from 'react';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import './transaction_style.css';

export default function TransactionLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { transactionId } = useParams();

    const navLinks = [
        { label: 'Overview', route: `/app/transactions/${transactionId}` },
        { label: 'Property Details', route: `/app/transactions/${transactionId}/property-details` },
        { label: 'Checklist', route: `/app/transactions/${transactionId}/checklist` },
        { label: 'Timeline', route: `/app/transactions/${transactionId}/timeline` },
        { label: 'Commission', route: `/app/transactions/${transactionId}/commission` },
        { label: 'Parties', route: `/app/transactions/${transactionId}/parties` },
        { label: 'Messages', route: `/app/transactions/${transactionId}/messages` },
        { label: 'Documents', route: `/app/transactions/${transactionId}/documents` },
    ];

    return (
        <>
            <AppNavigation />
            <br />
            <Container>
                <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
                    <div className='d-flex flex-grow-1'>
                        <Button variant="link" onClick={() => router.push('/app/transactions')}>← Back to Transactions</Button>
                        <div className='flex-grow-1'></div>
                        <Button variant="link" onClick={() => handleModalShow()}>Activity Log</Button>
                    </div>
                </Navbar>
                <br />
                <Row>
                    <Col xs='2'>
                        <Nav className="flex-column">
                            {navLinks.map(({ label, route }) => (
                                <Nav.Link
                                    key={route}
                                    className={pathname === route ? "text-white" : ''}
                                    onClick={() => router.push(route)}
                                >
                                    {label}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Col>
                    <Col xs='10'>
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    );
}