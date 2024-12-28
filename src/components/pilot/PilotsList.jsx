import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
import { Pagination } from '../common/pagination/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import Alert from '../common/Alert';
import ListHeader from "../common/ListHeader";
import PilotsListTable from "./PilotsListTable";
import { Entities } from '../../utils/const.js';

// Make search working
export default function PilotsList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pilots, setPilots] = useState([]);
    const { data, dataExist, error, isLoading, isError } = useFetch(Entities.PILOTS, null, pageNumber);

    useEffect(() => {
        if (data) {
            setPilots(data.data);
            setPageNumber(data.pageNumber);
            setTotalPages(data.totalPages);
        }
    }, [data]);

    function handlePageChange(newPageNumber) {
        setPageNumber(newPageNumber);
    }

    return (
        <>
            <ListHeader dataExist={dataExist} dataType={Entities.PILOTS} createButtonTitle="Create Pilot" />
            <br />
            {isLoading && <LoadingSpinner />}
            {isError && error && <Alert alertType="error" alertText={error.message} />}
            {!isError && !isLoading && (
                <div className="form-horizontal">
                    <div className="form-group">
                        {pilots && pilots.length > 0 ? (
                            <PilotsListTable pilots={pilots} />
                        ) : (
                            <Alert alertType="info" alertText="No pilots available" />
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
