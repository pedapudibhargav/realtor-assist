'use client'
import GetUserAccessToken from '@/utils/user';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

export default function CreateBrokerage() {
    const [error, setError] = React.useState([]);
    const BE_URI = process.env.NEXT_PUBLIC_BE_URI;
    const router = useRouter();
    const handleCreateBrokerage = async (brokerName) => {
        const authToken = GetUserAccessToken();
        if (!authToken) {
            console.error('No access token found');
            return;
        }
        console.log(`authToken: ${authToken}, brokerName: ${brokerName}`);
        fetch(BE_URI + '/api/brokerages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,

            },
            body: JSON.stringify({ brokerName }),
        }).then((response) => {
            if (!response.ok) {
                setError([response.statusText]);
                return;
            }
            console.log('Brokerage created successfully');
        }).catch((error) => {
            console.error('Error:', error);
            setError([error]);
        });
    }
    const handleOnCreate = (e) => {
        setError([]);
        e.preventDefault();
        const brokerName = e.target.brokerName.value;
        let errors = [];
        if (brokerName.length < 3) {
            errors.push("Broker name must be at least 3 characters long");
        }
        if (/[^a-zA-Z0-9 ]/.test(brokerName)) {
            errors.push("Broker name must not contain special characters");
        }
        console.log('errors:', errors);
        if (errors.length > 0) {
            setError(errors);
            return;
        }
        handleCreateBrokerage(brokerName);
    }

    const handleBackToPrevious = () => {
        // just use router and navigate to /app/brokerages
        router.push('/app/brokerages');
    }
    return (
        <>
            <br />
            <br />
            <br />
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card body className="bg-dark text-white">
                            <h2>Let's create a Brokerage</h2>
                            <form onSubmit={handleOnCreate}>
                                {/* input fields for broker name */}
                                <div className="mb-3">
                                    <label htmlFor="brokerName" className="form-label">Broker Name</label>
                                    <input type="text" className="form-control" id="brokerName" />
                                </div>
                                {
                                    (error.length > 0) &&
                                    <div className="alert alert-danger" role="alert">
                                        <ul>
                                            {error.map((err, index) => (
                                                <li key={index}>{err}</li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                                <button type="submit" className="btn btn-primary ">Create Brokerage</button>
                                <button onClick={handleBackToPrevious} className="btn btn-secondary mx-4">Back</button>
                            </form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
