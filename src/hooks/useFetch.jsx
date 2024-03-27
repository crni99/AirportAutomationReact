import { useState, useEffect } from 'react';
import { getAuthToken } from '../util/auth.js';

const BASE_URL = 'https://localhost:44362/api/';
const PAGE_SIZE = 10;

export default function useFetch(dataType, dataId, page = 1) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function executeOperation() {
            try {
                let url = BASE_URL + dataType;
                if (dataId !== null) {
                    url += `/${dataId}`;
                }
                else {
                    url += `?page=${page}&pageSize=${PAGE_SIZE}`;
                }
                const authToken = getAuthToken();
                const headers = {
                    'Content-Type': 'application/json'
                };
                if (authToken) {
                    headers['Authorization'] = `Bearer ${authToken}`;
                }
                const response = await fetch(url, {
                    headers: headers
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch data for ${dataType}`);
                }
                const responseData = await response.json();
                setData(responseData);
            } catch (error) {
                console.error(`Error fetching data for ${dataType}:`, error);
                setError(error.message);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        executeOperation();
    }, [dataType, dataId, page]);

    return { data, error, isLoading, isError };
}