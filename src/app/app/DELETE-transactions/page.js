'use client'
import { TransactionTypesMap } from '@/app/utilities/transactions_utils';
import AppNavigation from '@/components/navigation'
import { CreateTransaction, GetAllTransactions } from '@/services/transactionService';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Navbar, NavbarBrand, Row } from 'react-bootstrap'


export default function page() {
  const [enableModal, setEnableModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();

  React.useEffect(() => {
    setIsClient(true);
    GetAllTransactions().then((data) => {
      setTransactions(data);
    }).catch((error) => {
      console.error('Error Getting Transactions:', error);
    }
    );
  }, []);

  const handleModalClose = () => setEnableModal(false);
  const handleModalShow = () => setEnableModal(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // get transaction name. Check for special characters. Spaces are ok. Remove spaces from the start and end of the string
    const transactionName = e.target.transaction.value.trim();
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g;
    if (transactionName.length < 3 || specialCharRegex.test(transactionName)) {
      alert('Transaction name must be at least 3 characters long and cannot contain special characters');
      return;
    }
    // get transaction type
    const transactionType = e.target.transactionType.value;
    // check if transaction type is empty
    if (transactionType === '') {
      alert('Transaction type cannot be empty');
      return;
    }
    await CreateTransaction(transactionName, transactionType);
    handleModalClose();

    GetAllTransactions().then((data) => {
      setTransactions(data);
    }).catch((error) => {
      console.error('Error Getting Transactions:', error);
    }
    );
  }

  return (
    <>
      <AppNavigation />
      <br />
      <Container>
        <>
          <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
            <Container>
              <NavbarBrand> Transactions</NavbarBrand>
              <Col xs="auto">
                <Button onClick={() => handleModalShow()}>Create New</Button>
              </Col>

              {/* Add boostrap react Modal with some text in it. Connect with enableModal and pass respective close and open click handlers*/}
              <Modal show={enableModal} onHide={handleModalClose}>
                <form onSubmit={handleFormSubmit}>
                  <ModalHeader closeButton>
                    <ModalTitle>Create New Transaction</ModalTitle>
                  </ModalHeader>
                  <ModalBody>
                    <div className="mb-3">
                      <label htmlFor="transaction" className="form-label">Transaction Name</label>
                      <input type="text" className="form-control" id="transaction" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="transactionType" className="form-label">Transaction Type</label>
                      {/* select with options buy, sell */}
                      <select className="form-select" id="transactionType">
                        {
                          [...TransactionTypesMap.keys()].map((trasactionKey, index) => (
                            <option key={index} value={trasactionKey}>{TransactionTypesMap.get(trasactionKey)}</option>
                          ))
                        }
                      </select>
                    </div>

                  </ModalBody>
                  <ModalFooter>
                    <Button variant="secondary" onClick={handleModalClose}>
                      Close
                    </Button>
                    <Button type="submit" variant="primary">
                      Save Changes
                    </Button>
                  </ModalFooter>
                </form>
              </Modal>
            </Container>
          </Navbar>
          <br />
          {
            transactions?.length > 0 ? (
              <table className="table table-dark table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    transactions.map((transaction, index) => (
                      <tr key={index} onClick={() => router.push(`/app/transactions/${transaction.id}`)}>
                        <th scope="row">{index + 1}</th>
                        <td>{transaction.name}</td>
                        <td>{TransactionTypesMap.get(transaction?.transaction_type)}</td>
                        <td>
                          {
                            transaction?.status ? (<span className="badge rounded-pill text-bg-secondary">-</span>) : (<span className="badge rounded-pill text-bg-secondary">Draft</span>)
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            ) : (
              <p>No transactions found</p>
            )
          }
        </>
      </Container>
    </>
  )
}
