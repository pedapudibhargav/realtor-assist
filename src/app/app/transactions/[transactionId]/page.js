'use client';
import { GetTransactionById } from '@/services/transactionService';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Button, Card, CardBody, ProgressBar } from 'react-bootstrap';
import './transaction_style.css'

export default function Page() {
    const router = useRouter();
    const { transactionId } = useParams();
    const [transaction, setTransaction] = React.useState(null);
    useEffect(() => {
        const fetchTransaction = async () => {
            if (!transactionId) {
                router.push('./app/transactions');
                return;
            }
            const fetchedTransaction = await GetTransactionById(transactionId);
            if (!fetchedTransaction) {
                router.push('./app/transactions');
            } else {
                setTransaction(fetchedTransaction);
            }
        };

        fetchTransaction();
    }, []);

    const handleEditPropertyDetails = () => {
        router.push(`/app/transactions/${transactionId}/property-details`);
    };

    const handleManageParties = () => {
        router.push(`/app/transactions/${transactionId}/parties`);
    };

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col-12">
                    <Card>
                        <CardBody>
                            <h3>Transaction Title</h3>
                            <p>Transaction #TR-2025-1042</p>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className="row">
                <div className="col-8">
                    <Card className="mb-4">
                        <CardBody>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5>Property Information</h5>
                                <Button variant="link" onClick={handleEditPropertyDetails}>Edit</Button>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <span className="fw-bold">Address</span>
                                <span>123 Elm Street</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="fw-bold">Representation Type</span>
                                <span>Exclusive</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="fw-bold">Price</span>
                                <span>$500,000</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="fw-bold">MLS#</span>
                                <span>#123456</span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody>
                            <h5>Document Completion</h5>
                            <p>14 of 24 documents complete</p>
                            <ProgressBar now={58} label={`58%`} className="mb-3" />
                            <div className="d-flex justify-content-between mb-3">
                                <span>Offer Documents</span>
                                <span>5/5 Complete</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Inspection Documents</span>
                                <span>3/5 Complete</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Loan Documents</span>
                                <span>4/7 Complete</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Closing Documents</span>
                                <span>2/7 Complete</span>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-4">
                    <Card className="mb-4">
                        <CardBody>
                            <h5>Important Dates</h5>
                            <p className="text-primary">18 days remaining</p>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Closing Date</span>
                                <span>May 15, 2025</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Condition Removal Date</span>
                                <span>May 5, 2025</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Acceptance Date</span>
                                <span>April 30, 2025</span>
                            </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody>
                            <h5>Transaction Participants</h5>
                            <div className="mb-3">
                                <span className="fw-bold">John Doe</span>
                                <br />
                                <small className="text-muted">Buyer</small>
                            </div>
                            <div className="mb-3">
                                <span className="fw-bold">Jane Smith</span>
                                <br />
                                <small className="text-muted">Seller</small>
                            </div>
                            <div className="mb-3">
                                <span className="fw-bold">Alex Brown</span>
                                <br />
                                <small className="text-muted">Listing Agent</small>
                            </div>
                            <div className="mb-3">
                                <span className="fw-bold">Maria Lopez</span>
                                <br />
                                <small className="text-muted">Lender</small>
                            </div>
                            <Button variant="link" onClick={handleManageParties}>Manage Parties</Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
