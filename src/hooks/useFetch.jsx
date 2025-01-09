import { useState, useEffect, useCallback } from 'react';
import { getAuthToken } from '../utils/auth.js';
import { useContext } from 'react';
import { DataContext } from '../store/data-context.jsx';
import { generateErrorMessage, handleNetworkError } from '../utils/errorUtils.js';
import { Entities } from '../utils/const.js';

export default function useFetch(dataType, dataId, page = 1, triggerFetch) {
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
                const url = buildURL(dataCtx.apiUrl, dataType, dataId, page, dataCtx.pageSize);
                const response = await fetch(url, { headers: buildHeaders() });
                handleResponse(response);
            } catch (error) {
                handleFetchError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [dataType, dataId, page, dataCtx, handleResponse, triggerFetch]);

    function buildURL(apiUrl, dataType, dataId, page, pageSize) {
        let url = `${apiUrl}/${dataType}`;

        if (dataId !== null) {
            url += `/${dataId}`;
        } else {
            let paginationParams = `page=${page}&pageSize=${pageSize || 10}`;
            url += `?${paginationParams}`;

            switch (dataType) {
                case Entities.AIRLINES:
                    const searchName = document.getElementById('searchInput')?.value;
                    if (searchName && searchName.trim() !== '') {
                        url = `${apiUrl}/${Entities.AIRLINES}/ByName/${encodeURIComponent(searchName)}?&${paginationParams}`;
                    }
                    break;

                case Entities.API_USERS:
                    const searchRole = document.getElementById('roleSelect')?.value;
                    if (searchRole && searchRole.trim() !== '') {
                        url = `${apiUrl}/${Entities.API_USERS}/byRole/${encodeURIComponent(searchRole)}?&${paginationParams}`;
                    }
                    break;

                case Entities.DESTINATIONS:
                    const city = document.getElementById('city')?.value;
                    const airport = document.getElementById('airport')?.value;
                    if (city || airport) {
                        url = `${apiUrl}/${Entities.DESTINATIONS}/search?city=${encodeURIComponent(city)}&airport=${encodeURIComponent(airport)}&${paginationParams}`;
                    }
                    break;

                case Entities.FLIGHTS:
                    const startDate = document.getElementById('startDate')?.value;
                    const endDate = document.getElementById('endDate')?.value;
                    if (startDate || endDate) {
                        url = `${apiUrl}/${Entities.FLIGHTS}/byDate?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&${paginationParams}`;
                    }
                    break;

                case Entities.PASSENGERS:
                    const firstNamePassenger = document.getElementById('firstName')?.value;
                    const lastNamePassenger = document.getElementById('lastName')?.value;
                    if (firstNamePassenger || lastNamePassenger) {
                        url = `${apiUrl}/${Entities.PASSENGERS}/byName?firstName=${encodeURIComponent(firstNamePassenger)}&lastName=${encodeURIComponent(lastNamePassenger)}&${paginationParams}`;
                    }
                    break;

                case Entities.PILOTS:
                    const firstNamePilot = document.getElementById('firstName')?.value;
                    const lastNamePilot = document.getElementById('lastName')?.value;
                    if (firstNamePilot || lastNamePilot) {
                        url = `${apiUrl}/${Entities.PILOTS}/byName?firstName=${encodeURIComponent(firstNamePilot)}&lastName=${encodeURIComponent(lastNamePilot)}&${paginationParams}`;
                    }
                    break;

                case Entities.PLANE_TICKETS:
                    const minPrice = document.getElementById('minPrice')?.value;
                    const maxPrice = document.getElementById('maxPrice')?.value;
                    if ((minPrice && minPrice.trim() !== '') || (maxPrice && maxPrice.trim() !== '')) {
                        if (isNaN(minPrice) || isNaN(maxPrice)) {
                            return `${apiUrl}/${dataType}?${paginationParams}`;
                        }
                        url = `${apiUrl}/${Entities.PLANE_TICKETS}/byPrice?minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}&${paginationParams}`;
                    }
                    break;

                case Entities.HEALTH_CHECKS:
                    return `${apiUrl}/${dataType}`;

                default:
                    url = `${apiUrl}/${dataType}?${paginationParams}`;
                    break;
            }
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