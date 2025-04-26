import React from 'react'
import { Button, Col, Container, Navbar, NavbarBrand } from 'react-bootstrap'

export default function TransactionNav() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
                <Container>
                    <NavbarBrand> Transactions</NavbarBrand>
                    <Col xs="auto">
                        <Button >Create New</Button>
                    </Col>
                </Container>
            </Navbar>
        </>
    )
}
