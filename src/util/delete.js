import { getAuthToken } from '../util/auth.js';

export async function deleteData(dataType, dataId, navigate) {
    try {

        const authToken = getAuthToken();
        const headers = {
            'Content-Type': 'application/json'
        };
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }

        const response = await fetch(`https://localhost:44362/api/${dataType}/${dataId}`, {
            method: 'DELETE',
            headers: headers
        });

        if (response.ok) {
            navigate(`/${dataType}`);
        } else if (response.status === 400) {
            throw new Error('Invalid request to delete data');
        } else if (response.status === 401) {
            throw new Error('Unauthorized to delete data');
        } else {
            throw new Error('Failed to delete data');
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        return error.message;
    }
}
