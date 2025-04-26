import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'

export default function verify() {
  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <br/>
          <br/>
          <br/>
          <div>
            <h1 className='text-center'>Verify Your Email</h1>
            <Card
              bg={'dark'}
              text={'white'}
            >
              <CardBody>
                <blockquote class="blockquote">
                  <p className='text-center'>Please check your email for a verification link.</p>
                </blockquote>
                <p className='text-center'>If you don't see it, please check your spam folder.</p>
                <p className='text-center'>it might take upto 5 mins</p>
                {/* <button className='btn btn-primary' onClick={() => alert('Resend verification email')}>Resend Verification Email</button> */}
              </CardBody>
            </Card>
          </div>

        </Col>
      </Row>
    </Container>
  )
}
