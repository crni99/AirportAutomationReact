import { useState, useEffect } from 'react';
import { getAuthToken } from '../util/auth.js';
import { useContext } from 'react';
import { DataContext } from '../store/data-context.jsx';

export default function useFetch(dataType, dataId, page = 1) {
    const dataCtx = useContext(DataContext);

    const [data, setData] = useState(null);
    const [dataExist, setDataExist] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                if (!dataCtx || !dataCtx.apiUrl) {
                    throw new Error('API URL is not available');
                }
                const url = buildUrl(dataCtx.apiUrl, dataType, dataId, page, dataCtx.pageSize);
                const response = await fetch(url, { headers: buildHeaders() });

                handleResponse(response);
            } catch (error) {
                handleFetchError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [dataType, dataId, page, dataCtx]);

    function buildUrl(apiUrl, dataType, dataId, page, pageSize) {
        let url = apiUrl + '/' + dataType;
        if (dataId !== null) {
            url += `/${dataId}`;
        } else {
            url += `?page=${page}&pageSize=${pageSize || 10}`;
        }
        return url;
    }

    function buildHeaders() {
        const headers = { 'Content-Type': 'application/json' };
        const authToken = getAuthToken();
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        return headers;
    }

    async function handleResponse(response) {
        if (response.status === 200) {
            const responseData = await response.json();
            setData(responseData);
            setDataExist(true);
        } else if (response.status === 204) {
            setData([]);
            setDataExist(false);
        } else if (response.status === 400) {
            throw new Error(`Invalid request for ${dataType}`);
        } else if (response.status === 401) {
            throw new Error(`Unauthorized to access ${dataType}`);
        } else if (response.status === 404) {
            throw new Error(`Not found: The requested resource does not exist.`);
        } else {
            throw new Error(`Failed to fetch data for ${dataType}`);
        }
    }

    function handleFetchError(error) {
        console.error(`Error fetching data for ${dataType}:`, error);
        setError(error.message);
        setIsError(true);
    }

    return { data, dataExist, error, isLoading, isError };
}
