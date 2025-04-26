'use client'
import AppNavigation from '@/components/navigation'
import TransactionNav from '@/components/transaction/transactionNav'
import React from 'react'
import { Container, Row } from 'react-bootstrap'

export default function page() {
  return (
    <>
      <AppNavigation />
      <br/>      
      <Container>
        <Row>
          <TransactionNav />
        </Row>
      </Container>
    </>
  )
}
