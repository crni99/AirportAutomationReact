import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
import { Pagination } from '../common/pagination/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import Alert from '../common/Alert';
import ApiUsersListTable from "./ApiUsersListTable";
import PageTitle from '../common/PageTitle';

// Make search working
export default function ApiUsersList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [apiUsers, setApiUsers] = useState([]);
    const { data, error, isLoading, isError } = useFetch('ApiUsers', null, pageNumber);

    useEffect(() => {
        if (data) {
            setApiUsers(data.data);
            setPageNumber(data.pageNumber);
            setTotalPages(data.totalPages);
        }
    }, [data]);

    function handlePageChange(newPageNumber) {
        setPageNumber(newPageNumber);
    }

    return (
        <>
            <PageTitle title='Api Users' />
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
