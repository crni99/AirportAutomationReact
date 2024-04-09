import { getAuthToken } from '../util/auth.js';
import { generateErrorMessage, handleNetworkError } from '../util/errorUtils.js';

export async function createData(data, dataType, apiUrl, navigate) {
    try {

        const authToken = getAuthToken();
        const headers = {
            'Content-Type': 'application/json'
        };
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }

        const response = await fetch(`${apiUrl}/${dataType}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const responseData = await response.json();
            navigate(`/${dataType}/${responseData.id}`);
        } else {
            const errorMessage = await generateErrorMessage(response, dataType);
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
