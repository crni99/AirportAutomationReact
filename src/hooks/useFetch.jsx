import { useState, useEffect, useCallback  } from 'react';
import { getAuthToken } from '../utils/auth.js';
import { useContext } from 'react';
import { DataContext } from '../store/data-context.jsx';
import { generateErrorMessage, handleNetworkError } from '../utils/errorUtils.js';

export default function useFetch(dataType, dataId, page = 1) {
    const dataCtx = useContext(DataContext);

    const [data, setData] = useState(null);
    const [dataExist, setDataExist] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const handleResponse = useCallback(async (response) => {
        try {
            if (response.ok) {
                if (response.status === 204) {
                    setData([]);
                    setDataExist(false);
                } else {
                    const responseData = await response.json();
                    setData(responseData);
                    setDataExist(true);
                }
            } else {
                throw new Error(await generateErrorMessage(response, dataType, dataId));
            }
        } catch (error) {
            handleFetchError(error);
        }
    }, [dataType, dataId]);

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
    }, [dataType, dataId, page, dataCtx, handleResponse]);

    function buildUrl(apiUrl, dataType, dataId, page, pageSize) {
        let url = `${apiUrl}/${dataType}`;
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

    function handleFetchError(error) {
        const networkErrorMessage = handleNetworkError(error);
        if (networkErrorMessage) {
            setError(networkErrorMessage);
        } else {
            setError(error);
        }
        setIsError(true);
    }

    return { data, dataExist, error, isLoading, isError };
}