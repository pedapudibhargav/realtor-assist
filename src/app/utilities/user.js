import { GetUserAccessToken } from "@/utils/user";

const BE_TRANSACTION_URI = process.env.REACT_APP_BACKEND_API + '/api/auth/people';
export const CreateNewPerson = async (personData) => {
    const AuthToken = GetUserAccessToken();
    if (!AuthToken) {
        console.error('No access token found');
        return;
    }
    // create  a post request to the backend with authorization token in header
    const response = await fetch(BE_TRANSACTION_URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: AuthToken,
        },
        body: JSON.stringify(personData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create person');
    }
    const data = await response.json();
    return data;
}