'use client';
import { TransactionRolesMap, TransactionTypesMap } from '@/app/utilities/transactions_utils';
import { GetTransactionById } from '@/services/transactionService';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Button, Card, CardBody, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import './transaction_style.css'

export default function Page() {
    const router = useRouter();
    const { transactionId } = useParams();
    const [transaction, setTransaction] = React.useState(null);
    const [enableAddPersonModal, setEnableAddPersonModal] = React.useState(false);
    const [enableCreatePersonModal, setEnableCreatePersonModal] = React.useState(false);

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

    const handleModalClose = () => {
        setEnableAddPersonModal(false);
    }

    const handleModalShow = () => setEnableAddPersonModal(true);

    const handleAddPerson = async (e) => {
        e.preventDefault();
    }

    const handleCreatePerson = async (e) => {

    }
    const handleCreatePersonModalClose = () => {
        setEnableCreatePersonModal(false);
    }


    return (
        <>
            <div>
                <h2>{transaction?.name}</h2>
                <p>{TransactionTypesMap.get(transaction?.transaction_type) || ''} &nbsp; ⎸ <Button variant="link" onClick={() => console.log('Edit Transaction clicked...')}>Edit Transaction</Button></p>
            </div>
            <div>
                <Card className="bg-dark text-white">
                    <CardBody>
                        <h4>Documents</h4>
                        <br />
                    </CardBody>
                </Card>
            </div>
            <br />
            <div>
                <Card className="bg-dark text-white">
                    <CardBody>
                        <div className='d-flex flex-grow-1'>
                            <h4>People</h4>
                            <div className='flex-grow-1'></div>
                            <Button variant="outline-secondary" onClick={() => setEnableCreatePersonModal(true)} className='mx-2'>Create New Person</Button>
                            <Button variant="outline-primary" onClick={() => handleModalShow()}>Add Person</Button>
                        </div>
                        <br />
                        <div>
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td colSpan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </div>


            {/* Search for a person */}
            <Modal show={enableAddPersonModal} onHide={handleModalClose}>
                <div >
                    <ModalHeader closeButton>
                        <ModalTitle>Add Person</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div className="mb-3">
                            <label htmlFor="person-name" className="form-label">Search for a user</label>
                            <input type="text" className="form-control" id="person-name" />
                        </div>
                        <hr />
                        <form onSubmit={handleAddPerson}>
                            {/* fields for name, email, role (select field iterate over TransactionRolesMap from utils) */}
                            <div className="mb-3">
                                <label htmlFor="person-name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="person-name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="person-email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="person-email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="person-role" className="form-label">Role</label>
                                <select className="form-select" id="person-role">
                                    {
                                        Array.from(TransactionTypesMap.keys()).map((trasactionKey, index) => (
                                            <option key={index} value={trasactionKey}>{TransactionTypesMap.get(trasactionKey)}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {/* primary  */}
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </ModalFooter>
                </div>
            </Modal>


            {/* Create a new person */}
            <Modal show={enableCreatePersonModal} onHide={handleCreatePersonModalClose}>
                <form onSubmit={handleCreatePerson} >
                    <ModalHeader closeButton>
                        <ModalTitle>Create A Person</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        {/* fields for name, email, role (select field iterate over TransactionRolesMap from utils) */}
                        <div className="mb-3">
                            <label htmlFor="person-name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="person-name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="person-email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="person-email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="person-role" className="form-label">Role</label>

                            <select className="form-select" id="person-role">
                                {
                                    [...TransactionRolesMap.keys()].map((trasactionKey, index) => (
                                        <option key={index} value={trasactionKey}>{TransactionRolesMap.get(trasactionKey)}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={handleCreatePersonModalClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </>
    );
}
