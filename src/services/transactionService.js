import { GetUserAccessToken } from "@/utils/user";
import { GetActiveBrokerageId } from "./brokerageService";

const BE_URI = process.env.NEXT_PUBLIC_BE_URI;
const BE_TRANSACTION_URI = BE_URI + '/api/transactions';

const CreateTransaction = async (transaction_name, transactionType) => {
    const brokerage_id = GetActiveBrokerageId();
    if (!brokerage_id) {
        console.error('No active brokerage found');
        return;
    }
    const authToken = GetUserAccessToken();
    if (!authToken) {
        console.error('No access token found');
        return;
    }
    const response = await fetch(BE_TRANSACTION_URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken,
        },
        body: JSON.stringify({
            transaction_name: transaction_name,
            brokerage_id: brokerage_id,
            transaction_type: transactionType,
        }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create transaction');
    }
    const data = await response.json();
    return data.transaction;
}

const GetAllTransactions = async () => {
    const brokerage_id = GetActiveBrokerageId();
    if (!brokerage_id) {
        console.error('No active brokerage found');
        return;
    }
    const authToken = GetUserAccessToken();
    if (!authToken) {
        console.error('No access token found');
        return;
    }
    const response = await fetch(`${BE_TRANSACTION_URI}?brokerage_id=${brokerage_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken,
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch transactions');
    }
    const data = await response.json();
    return data;
}


const GetTransactionById = async (transactionId) => {
    const brokerage_id = GetActiveBrokerageId();
    if (!brokerage_id) {
        console.error('No active brokerage found');
        return;
    }
    const authToken = GetUserAccessToken();
    if (!authToken) {
        console.error('No access token found');
        return;
    }
    const response = await fetch(`${BE_TRANSACTION_URI}/${transactionId}?brokerage_id=${brokerage_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken,
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch transaction');
    }
    const data = await response.json();
    return data;
}

const UpdateTransactionById = async (transactionId, transactionData) => {
    const brokerage_id = GetActiveBrokerageId();
    if (!brokerage_id) {
        console.error('No active brokerage found');
        return;
    }
    const authToken = GetUserAccessToken();
    if (!authToken) {
        console.error('No access token found');
        return;
    }
    const response = await fetch(`${BE_TRANSACTION_URI}/${transactionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken,
        },
        body: JSON.stringify({
            ...transactionData,
            brokerage_id: brokerage_id,
        }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update transaction');
    }
    const data = await response.json();
    return data.transaction;
}


const AddTransactionParty = async (transactionId, partyData) => {
    const brokerage_id = GetActiveBrokerageId();
    if (!brokerage_id) {
        console.error('No active brokerage found');
        return;
    }
    const authToken = GetUserAccessToken();
    if (!authToken) {
        console.error('No access token found');
        return;
    }
    const response = await fetch(`${BE_TRANSACTION_URI}/${transactionId}/parties`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken,
        },
        body: JSON.stringify({
            ...partyData,
            brokerage_id: brokerage_id,
        }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add transaction party');
    }
    const data = await response.json();
    return data.transaction;
}

export { CreateTransaction, GetAllTransactions, GetTransactionById, UpdateTransactionById };