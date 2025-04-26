const GetUserAccessToken = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; access_token=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}
export default GetUserAccessToken;