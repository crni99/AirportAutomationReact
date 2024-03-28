import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
import { Pagination } from '../common/pagination/Pagination';
import Alert from '../common/Alert';
import ListHeader from "../common/ListHeader";

export default function AirlineList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [airlines, setAirlines] = useState([]);
    const { data, error, isLoading, isError } = useFetch('Airlines', null, pageNumber);

    useEffect(() => {
        if (data) {
            setAirlines(data.data);
            setPageNumber(data.pageNumber);
            setTotalPages(data.totalPages);
        }
    }, [data]);

    function handlePageChange(newPageNumber) {
        setPageNumber(newPageNumber);
    }

    return (
        <>
            <ListHeader data={airlines} dataType="Airlines" createButtonTitle="Create Airline" searchText="Search by Name:" />
            <br />
            {isLoading && <Alert alertType="info" alertText="Loading..." />}
            {isError && error && <Alert alertType="error" alertText={error} />}
            {!isError && !isLoading && (
                <div className="form-horizontal">
                    <div className="form-group">
                        {airlines && airlines.length > 0 ? (
                            <div>
                                <hr />
                                <table className="table table-responsive table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody">
                                        {airlines.map(airline => (
                                            <tr key={airline.id} className="clickable-row" onClick={() => window.open(`/Airlines/${airline.id}`, '_blank')}>
                                                <td>{airline.id}</td>
                                                <td>{airline.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <Alert alertType="info" alertText="No airlines available" />
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
