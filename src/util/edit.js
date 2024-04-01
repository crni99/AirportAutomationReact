import { getAuthToken } from '../util/auth.js';

export async function editData(data, dataType, dataId, apiUrl, navigate) {
    try {

        const authToken = getAuthToken();
        const headers = {
            'Content-Type': 'application/json'
        };
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }

        const response = await fetch(`${apiUrl}/${dataType}/${dataId}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        });
        if (response.ok || response.status === 204) {
            navigate(`/${dataType}/${dataId}`);
        } else if (response.status === 400) {
            throw new Error('Bad request: The server cannot process the request due to a client error.');
        } else if (response.status === 401) {
            throw new Error('Unauthorized: Authentication is required and has failed or has not yet been provided.');
        } else if (response.status === 403) {
            throw new Error('Forbidden: The server understood the request but refuses to authorize it.');
        } else {
            throw new Error(`Failed to create ${dataType}: Server returned status ${response.status}.`);
        }
    } catch (error) {
        console.error('Error creating data:', error);
        return error.message;
    }
}
