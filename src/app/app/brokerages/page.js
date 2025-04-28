'use client'
import { SaveBrokeragesToLocalStorage, SetActiveBrokerage } from '@/services/brokerageService';
import { GetUserAccessToken } from '@/utils/user';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Container, Row } from 'react-bootstrap';

export default function Brokarage() {
    const BE_URI = process.env.NEXT_PUBLIC_BE_URI;
    const BE_BROKERAGE_URI = BE_URI + '/api/brokerages';
    // get all brokerages from Back end on load and assing it to brokerages state variable
    const [brokerages, setBrokerages] = React.useState([]);
    const [error, setError] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();

    const fetchBrokerages = async () => {
        setIsLoading(true);
        const authToken = GetUserAccessToken();
        if (!authToken) {
            console.error('No access token found');
            return;
        }
        console.log(`authToken: ${authToken}`);
        fetch(BE_BROKERAGE_URI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
        }).then((response) => {
            if (!response.ok) {
                setError([response.statusText]);
                return;
            }
            return response.json();
        }).then((data) => {
            setBrokerages(data);
            SaveBrokeragesToLocalStorage(data);
            setIsLoading(false);
        }).catch((error) => {
            console.error('Error:', error);
            setError([error]);
            setIsLoading(false);
        });
    }

    const handleCreateNewBrokerage = () => {
        // just use router and navigate to /app/brokerages/create
        router.push('/app/brokerages/create');
    };

    const handleSelectBrokerage = (brokerageId) => {
        SetActiveBrokerage(brokerageId);
        router.push('/app');
    };

    React.useEffect(() => {
        fetchBrokerages();
    }, []);

    if (isLoading) {
        return (
            <Container>
                <Row>
                    <Card md={{ span: 4, offset: 4 }} body className="bg-dark text-white">
                        <h2>Loading...</h2>
                    </Card>
                </Row>
            </Container>
        )
    }
    if (!isLoading && error.length > 0) {
        return (
            <Container>
                <Row>
                    <Card md={{ span: 4, offset: 4 }} body className="bg-dark text-white">
                        <h2>Error: {error}</h2>
                    </Card>
                </Row>
            </Container>
        )
    }
    return (
        <Container>

            <br />
            <br />
            <br />
            <br />            
            <Row>
                {brokerages.map((brokerage, keyIn) => (
                    <Col key={keyIn}>
                        <Card border="primary" bg="dark" text='light' style={{ width: '18rem' }}>
                            {/* <CardHeader>Brokerage</CardHeader> */}
                            <CardBody>
                                <CardTitle>{JSON.stringify(brokerage['brokerage']['name'])}</CardTitle>
                                <button className='btn btn-primary' onClick={()=>handleSelectBrokerage(brokerage['brokerage']['id'])}>Select</button>
                                {/* <CardText>
                                </CardText> */}
                            </CardBody>
                        </Card>
                    </Col>
                ))}
                <Col>
                    <Card border="dark" bg="dark" text='light' style={{ width: '18rem' }}>
                        <CardBody>
                            <CardTitle>Create New</CardTitle>
                            <button className='btn btn-primary' onClick={handleCreateNewBrokerage}>Select</button>
                        </CardBody>
                    </Card>
                </Col>

            </Row>
        </Container>
    )
}
