import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
import { Pagination } from '../common/pagination/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import Alert from '../common/Alert';
import ListHeader from "../common/ListHeader";
import PlaneTicketsListTable from "./PlaneTicketsListTable";
import { Entities } from '../../utils/const.js';

export default function PlaneTicketsList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [planeTickets, setPlaneTickets] = useState([]);
    const [triggerFetch, setTriggerFetch] = useState(false);
    const { data, dataExist, error, isLoading, isError } = useFetch(Entities.PLANE_TICKETS, null, pageNumber, triggerFetch);

    useEffect(() => {
        if (data) {
            setPlaneTickets(data.data);
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
            <ListHeader dataExist={dataExist} dataType={Entities.PLANE_TICKETS} createButtonTitle="Create Plane Ticket" setTriggerFetch={setTriggerFetch} />
            <br />
            {isLoading && <LoadingSpinner />}
            {isError && error && <Alert alertType="error" alertText={error.message} />}
            {!isError && !isLoading && (
                <div className="form-horizontal">
                    <div className="form-group">
                        {planeTickets && planeTickets.length > 0 ? (
                            <PlaneTicketsListTable planeTickets={planeTickets} />
                        ) : (
                            <Alert alertType="info" alertText="No plane tickets available" />
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
