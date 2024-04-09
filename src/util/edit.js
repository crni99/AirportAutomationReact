import { getAuthToken } from '../util/auth.js';
import { generateErrorMessage, handleNetworkError } from '../util/errorUtils.js';

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
        } else {
            const errorMessage = await generateErrorMessage(response, dataType, dataId);
            throw new Error(errorMessage);
        }
    } catch (error) {
        const networkErrorMessage = handleNetworkError(error);
        if (networkErrorMessage) {
            return networkErrorMessage;
        } else {
            console.error('Error creating data:', error);
        }
        return error;
    }
}

