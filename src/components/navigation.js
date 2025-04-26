'use client'
import React from 'react';
import { Navbar, Container, Nav, NavbarBrand, NavDropdown, NavLink, DropdownItem, DropdownDivider } from 'react-bootstrap';
import { useRouter } from "next/navigation";
import GetUserAccessToken from '@/utils/user';

export default function AppNavigation() {
  const BE_URI = process.env.NEXT_PUBLIC_BE_URI;
  const router = useRouter();

  

  const handleLogout = (e) => {
    e.preventDefault();
    console.log('Logging out...');
    const accessToken = GetUserAccessToken();
    if (!accessToken) {
      console.error('Access token not found in cookies');
      return;
    }
    fetch(BE_URI + '/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('Logout successful:', data);
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear token from cookies
        // Redirect to login page or show a message 
        router.push('/login');
      }).catch(err => {
        console.log('Logout error:', err);
      });
  }

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <NavbarBrand href="#home">MY APP</NavbarBrand>
        <Nav className="me-auto">
          <NavLink onClick={() => router.push('/app/transactions')}>Transactions</NavLink>
          <NavDropdown title="Team" id="team-nav-dropdown" align="end">
            {/* <DropdownItem href="#action/3.1">Action</DropdownItem>
            <DropdownItem href="#action/3.2">
              Another action
            </DropdownItem>*/}
            <DropdownItem href="/">Team A</DropdownItem>
            <DropdownDivider />
            <DropdownItem>
              Create New Team
            </DropdownItem>
          </NavDropdown>
          <NavLink href="#pricing">Contacts</NavLink>
        </Nav>
        <Nav>
          <NavDropdown title="Settings" id="basic-nav-dropdown" align="end">
            {/* <DropdownItem href="#action/3.1">Action</DropdownItem>
            <DropdownItem href="#action/3.2">
              Another action
            </DropdownItem>
            <DropdownItem href="#action/3.3">Something</DropdownItem> */}
            <DropdownDivider />
            <DropdownItem onClick={(e) => handleLogout(e)}>
              Log Out
            </DropdownItem>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}
