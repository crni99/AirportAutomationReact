import { getAuthToken } from '../util/auth.js';

export async function deleteData(dataType, dataId, apiUrl, navigate) {
    try {
        const authToken = getAuthToken();
        const headers = {
            'Content-Type': 'application/json'
        };
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }

        const response = await fetch(`${apiUrl}/${dataType}/${dataId}`, {
            method: 'DELETE',
            headers: headers
        });

        if (response.ok) {
            navigate(`/${dataType}`);
        } else if (response.status === 400) {
            throw new Error('Invalid request to delete data');
        } else if (response.status === 401) {
            throw new Error('Unauthorized to delete data');
        } else if (response.status === 404) {
            throw new Error(`Not found: The requested resource with id ${dataId} does not exist.`);
        } else if (response.status === 409) {
            throw new Error(`Data with id ${dataId} is being referenced by other entities and cannot be deleted`);
        } else {
            throw new Error('Failed to delete data');
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        return error.message;
    }
}
