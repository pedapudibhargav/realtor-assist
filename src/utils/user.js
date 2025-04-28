export const GetUserAccessToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; access_token=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

export const CreateAnonymousUser = async (email, name) => {
    const authToken = GetUserAccessToken();
    if (!authToken) {
        console.error('No access token found');
        return;
    }
    // get current brokerage id
    const brokerageId = GetActiveBrokerageId();
    if (!brokerageId) {
        console.error('No active brokerage found');
        return;
    }
    const response = await fetch(`${BE_USER_URI}/inactive`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authToken,
        },
        body: JSON.stringify({
            email: email,
            name: name,
            brokerage_id: brokerageId,
        }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add inactive user');
    }
    const data = await response.json();
    return data;
}