import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
import { Pagination } from '../common/pagination/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import Alert from '../common/Alert';
import ListHeader from "../common/ListHeader";
import AirlinesListTable from "./AirlinesListTable";
import { Entities } from '../../utils/const.js';

export default function AirlineList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [airlines, setAirlines] = useState([]);
    const [triggerFetch, setTriggerFetch] = useState(false);
    const { data, dataExist, error, isLoading, isError } = useFetch(Entities.AIRLINES, null, pageNumber, triggerFetch);

    useEffect(() => {
        if (data) {
            setAirlines(data.data);
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
            <ListHeader dataExist={dataExist} dataType={Entities.AIRLINES} createButtonTitle="Create Airline" setTriggerFetch={setTriggerFetch} />
            <br />
            {isLoading && <LoadingSpinner />}
            {isError && error && <Alert alertType="error" alertText={error.message} />}
            {!isError && !isLoading && (
                <div className="form-horizontal">
                    <div className="form-group">
                        {airlines && airlines.length > 0 ? (
                            <AirlinesListTable airlines={airlines} />
                        ) : (
                            <Alert alertType="info" alertText="No airlines available" />
                        )}
                    </div>
                    <div>
                        <Pagination pageNumber={pageNumber} lastPage={totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            )}
        </>
    );
}
