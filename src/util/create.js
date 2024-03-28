import { getAuthToken } from '../util/auth.js';

export async function createData(data, dataType, navigate) {
    try {

        const authToken = getAuthToken();
        const headers = {
            'Content-Type': 'application/json'
        };
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }

        const response = await fetch(`https://localhost:44362/api/${dataType}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const responseData = await response.json();
            navigate(`/${dataType}/${responseData.id}`);
        } else if (response.status === 400) {
            throw new Error('Invalid request to create data');
        } else if (response.status === 401) {
            throw new Error('Unauthorized to create data');
        } else {
            throw new Error('Failed to create data');
        }
    } catch (error) {
        console.error('Error creating data:', error);
        return error.message;
    }
}
