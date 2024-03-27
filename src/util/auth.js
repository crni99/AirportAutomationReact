import { redirect } from 'react-router-dom';

export async function authenticateUser(userName, password) {
    const userCredentials = {
        UserName: userName,
        Password: password
    };

    try {
        const response = await fetch('https://localhost:44362/api/Authentication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userCredentials)
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate');
        }

        const token = await response.text();
        localStorage.setItem('token', token);

        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('expiration', expiration.toISOString());

        window.location.href = '/HealthCheck';
    } catch (error) {
        console.error('Error:', error);
    }
}

export function handleSignOut() {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        window.location.href = '/';
    } catch (error) {
        console.error('Error while signing out:', error);
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
    console.log(tokenDuration);
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