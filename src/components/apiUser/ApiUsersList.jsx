import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
import { Pagination } from '../common/pagination/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import Alert from '../common/Alert';
import ApiUsersListTable from "./ApiUsersListTable";
import ListHeader from "../common/ListHeader";
import { Entities } from '../../utils/const.js';

export default function ApiUsersList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [apiUsers, setApiUsers] = useState([]);
    const [triggerFetch, setTriggerFetch] = useState(false);
    const { data, dataExist, error, isLoading, isError } = useFetch(Entities.API_USERS, null, pageNumber, triggerFetch);

    useEffect(() => {
        if (data) {
            setApiUsers(data.data);
            setPageNumber(data.pageNumber);
            setTotalPages(data.totalPages);
            setTriggerFetch(false);
        }
    }, [data]);

    function handlePageChange(newPageNumber) {
        setPageNumber(newPageNumber);
    }

    return (
        <>
            <ListHeader dataExist={dataExist} dataType={Entities.API_USERS} setTriggerFetch={setTriggerFetch} />
            <br />
            {isLoading && <LoadingSpinner />}
            {isError && error && <Alert alertType="error" alertText={error.message} />}
            {!isError && !isLoading && (
                <div className="form-horizontal">
                    <div className="form-group">
                        {apiUsers && apiUsers.length > 0 ? (
                            <ApiUsersListTable apiUsers={apiUsers} />
                        ) : (
                            <Alert alertType="info" alertText="No api users available" />
                        )}
                        <div>
                            <Pagination pageNumber={pageNumber} lastPage={totalPages} onPageChange={handlePageChange} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
