import AppNavigation from '@/components/navigation';
import React from 'react'
import { Card, Container, Nav, NavItem, NavLink, Row } from 'react-bootstrap'

export default function TeamsView() {
    return (
        <>
            <AppNavigation />
            <br />
            <Container>
                <Row>
                    <Card body className="bg-dark text-white">
                        <Nav justify variant="tabs" defaultActiveKey="/home">
                            <NavItem>
                                <NavLink >Team Details</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>Users & Access</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>Settings</NavLink>
                            </NavItem>
                            <NavItem>
                            </NavItem>
                        </Nav>
                    </Card>
                </Row>
            </Container>
        </>
    )
}
