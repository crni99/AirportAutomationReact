import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
import { Pagination } from '../common/pagination/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import Alert from '../common/Alert';
import ListHeader from "../common/ListHeader";
import DestinationsListTable from "./DestinationsListTable";
import { Entities } from '../../utils/const.js';

export default function DestinationsList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [destinations, setDestinations] = useState([]);
    const [triggerFetch, setTriggerFetch] = useState(false);
    const { data, dataExist, error, isLoading, isError } = useFetch(Entities.DESTINATIONS, null, pageNumber, triggerFetch);

    useEffect(() => {
        if (data) {
            setDestinations(data.data);
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
            <ListHeader dataExist={dataExist} dataType={Entities.DESTINATIONS} createButtonTitle="Create Destination" searchText="Search by Name:" setTriggerFetch={setTriggerFetch} />
            <br />
            {isLoading && <LoadingSpinner />}
            {isError && error && <Alert alertType="error" alertText={error.message} />}
            {!isError && !isLoading && (
                <div className="form-horizontal">
                    <div className="form-group">
                        {destinations && destinations.length > 0 ? (
                            <DestinationsListTable destinations={destinations} />
                        ) : (
                            <Alert alertType="info" alertText="No destinations available" />
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
