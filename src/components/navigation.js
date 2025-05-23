'use client'
import React from 'react';
import { Navbar, Container, Nav, NavbarBrand, NavDropdown, NavLink, DropdownItem, DropdownDivider } from 'react-bootstrap';
import { useRouter, usePathname } from "next/navigation";
import { GetUserAccessToken } from '@/utils/user';

export default function AppNavigation() {
  const BE_URI = process.env.NEXT_PUBLIC_BE_URI;
  const router = useRouter();
  const pathname = usePathname();

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
        document.cookie = 'access_token=; path=/;'; // Clear token from cookies
        // Redirect to login page or show a message 
        router.push('/login');
      }).catch(err => {
        console.log('Logout error:', err);
      });
  }

  return (
    <Navbar className="layout-top-nav bg-primary" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          {/* <NavDropdown title="Brokerages" align="end">
            <DropdownItem onClick={() => router.push('/app/brokerages')}>View All</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={() => router.push('/app/brokerages/create')}>
              Create New Team
            </DropdownItem>
          </NavDropdown> */}
          {/* 
          <NavDropdown title="Teams" id="team-nav-dropdown" align="end">
            <DropdownItem href="/">Team A</DropdownItem>
            <DropdownDivider />
            <DropdownItem>
              Create New Team
            </DropdownItem>
          </NavDropdown> */}

          <NavLink
            onClick={() => router.push('/123/agent')}
            className={pathname.includes('/agent') ? 'active' : ''}
          >Agent</NavLink>
          <NavLink
            onClick={() => router.push('/123/conveyancer/dashboard')}
            className={pathname.includes('/conveyancer') ? 'active' : ''}
          >
            Conveyancer
          </NavLink>
          <NavLink
            onClick={() => router.push('/123/admin')}
            className={pathname.includes('/admin') ? 'active' : ''}
          >
            Admin
          </NavLink>
          <NavLink
            onClick={() => router.push('/123/transactions/578febab-5484-49e3-bff1-8951c04c10c7')}
            className={pathname.includes('/transactions/578febab-5484-49e3-bff1-8951c04c10c7') ? 'active' : ''}
          >
            Transaction
          </NavLink>
          <NavLink
            onClick={() => router.push('/123/transactions')}
            className={pathname.endsWith('/transactions') ? 'active' : ''}
          >
            Transactions
          </NavLink>


        </Nav>
        <Nav>
          <NavDropdown title="Settings" id="basic-nav-dropdown" align="end">
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
