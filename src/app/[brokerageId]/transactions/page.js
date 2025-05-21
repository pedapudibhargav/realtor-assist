'use client'
import { TransactionTypesMap } from '@/app/utilities/transactions_utils';
import { CreateTransaction, GetAllTransactions } from '@/services/transactionService';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap'


export default function TransactionsPage() {
  const [enableModal, setEnableModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
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

  // Sort and filter logic
  const sortedAndFilteredTransactions = React.useMemo(() => {
    let filtered = transactions;
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.transaction_type === filterType);
    }
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(t => t.name?.toLowerCase().includes(searchTerm.trim().toLowerCase()));
    }
    let sorted = [...filtered];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'status') {
      sorted.sort((a, b) => (a.status || '').localeCompare(b.status || ''));
    } else if (sortBy === 'createdAt') {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    return sorted;
  }, [transactions, sortBy, filterType, searchTerm]);

  return (
    <>
      <h3 className="fw-bold mb-4">Transactions</h3>
      <nav className="navbar navbar-expand bg-light rounded shadow-sm px-3 mb-4">
        <div className="container-fluid p-0 d-flex flex-wrap align-items-center gap-2">
          <input
            type="text"
            className="form-control form-control-sm"
            style={{ width: 180, maxWidth: '100%' }}
            placeholder="Search by name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select className="form-select form-select-sm" style={{width: 140}} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="createdAt">Sort by: Newest</option>
            <option value="name">Sort by: Name</option>
            <option value="status">Sort by: Status</option>
          </select>
          <select className="form-select form-select-sm" style={{width: 140}} value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            {[...TransactionTypesMap.keys()].map((key, idx) => (
              <option key={idx} value={key}>{TransactionTypesMap.get(key)}</option>
            ))}
          </select>
          <Button onClick={handleModalShow} variant="primary" className="ms-auto">+ Create New</Button>
        </div>
      </nav>
      <Modal show={enableModal} onHide={handleModalClose} centered>
        <form onSubmit={handleFormSubmit}>
          <ModalHeader closeButton>
            <ModalTitle>Create New Transaction</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="mb-3">
              <label htmlFor="transaction" className="form-label">Transaction Name</label>
              <input type="text" className="form-control" id="transaction" required minLength={3} />
            </div>
            <div className="mb-3">
              <label htmlFor="transactionType" className="form-label">Transaction Type</label>
              <select className="form-select" id="transactionType" required>
                {[...TransactionTypesMap.keys()].map((key, idx) => (
                  <option key={idx} value={key}>{TransactionTypesMap.get(key)}</option>
                ))}
              </select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
            <Button type="submit" variant="primary">Create</Button>
          </ModalFooter>
        </form>
      </Modal>
      {sortedAndFilteredTransactions?.length > 0 ? (
        <div className="row g-3">
          {sortedAndFilteredTransactions.map((transaction, idx) => (
            <div className="col-md-6 col-lg-4" key={transaction.id}>
              <div className="card shadow-sm h-100 transaction-card clickable" onClick={() => router.push(`/123/transactions/${transaction.id}`)}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-secondary">{TransactionTypesMap.get(transaction?.transaction_type)}</span>
                    <span className={`badge ${transaction?.status ? 'bg-success' : 'bg-warning text-dark'}`}>{transaction?.status || 'Draft'}</span>
                  </div>
                  <h5 className="card-title mb-2">{transaction.name}</h5>
                  <div className="text-muted small">ID: {transaction.id}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <img src="/window.svg" alt="No transactions" style={{ width: 80, opacity: 0.5 }} className="mb-3" />
          <h5 className="mb-2">No transactions found</h5>
          <div className="text-muted mb-3">Start by creating your first transaction.</div>
          <Button onClick={handleModalShow} variant="primary">Create Transaction</Button>
        </div>
      )}
      <style jsx global>{`
        .transaction-card.clickable { cursor: pointer; transition: box-shadow 0.2s; }
        .transaction-card.clickable:hover { box-shadow: 0 8px 32px 0 #0d6efd55, 0 4px 16px rgba(0,0,0,0.12); z-index: 2; }
      `}</style>
    </>
  );
}
