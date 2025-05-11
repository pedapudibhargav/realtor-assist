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
        </>
    );
}
