import { redirect } from 'react-router-dom';
import { generateErrorMessage, handleNetworkError } from '../util/errorUtils.js';

export async function authenticateUser(userName, password, apiUrl) {
    const userCredentials = {
        UserName: userName,
        Password: password
    };

    try {
        if (!apiUrl) {
            throw new Error('API URL is not available');
        }
        const response = await fetch(`${apiUrl}/Authentication`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        });

        if (!response.ok) {
            const networkErrorMessage = handleNetworkError(response);
            if (networkErrorMessage) {
                return networkErrorMessage;
            } else {
                const errorMessage = await generateErrorMessage(response, 'Authentication');
                throw new Error(errorMessage);
            }
        }

        const token = await response.text();
        localStorage.setItem('token', token);

        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('expiration', expiration.toISOString());

        window.location.href = '/HealthCheck';
    } catch (error) {
        const networkErrorMessage = handleNetworkError(error);
        if (networkErrorMessage) {
            console.error(networkErrorMessage);
            return networkErrorMessage;
        } else {
            console.error(error);
            return error;
        }
    }
}

export function handleSignOut() {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        window.location.href = '/';
    } catch (error) {
        const errorMessage = handleNetworkError(error);
        if (errorMessage) {
            console.error('Error while signing out:', errorMessage);
        } else {
            console.error('Error while signing out:', error);
        }
        return error;
    }
}

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    if (!storedExpirationDate) {
        return 0;
    }
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) {
        return 'EXPIRED';
    }
    return token;
}

export function tokenLoader() {
    const token = getAuthToken();
    return token;
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }
}