import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
import { Pagination } from '../common/pagination/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import Alert from '../common/Alert';
import ListHeader from "../common/ListHeader";
import PassengersListTable from "./PassengersListTable";
import { Entities } from '../../utils/const.js';

// Make search working
export default function PassengersList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [passengers, setPassengers] = useState([]);
    const { data, dataExist, error, isLoading, isError } = useFetch(Entities.PASSENGERS, null, pageNumber);

    useEffect(() => {
        if (data) {
            setPassengers(data.data);
            setPageNumber(data.pageNumber);
            setTotalPages(data.totalPages);
        }
    }, [data]);

    function handlePageChange(newPageNumber) {
        setPageNumber(newPageNumber);
    }

    return (
        <>
            <ListHeader dataExist={dataExist} dataType={Entities.PASSENGERS} createButtonTitle="Create Passenger" />
            <br />
            {isLoading && <LoadingSpinner />}
            {isError && error && <Alert alertType="error" alertText={error.message} />}
            {!isError && !isLoading && (
                <div className="form-horizontal">
                    <div className="form-group">
                        {passengers && passengers.length > 0 ? (
                            <PassengersListTable passengers={passengers} />
                        ) : (
                            <Alert alertType="info" alertText="No passengers available" />
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
