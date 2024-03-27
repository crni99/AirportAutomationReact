import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
import { Pagination } from '../common/Pagination';
import CreateButton from "../common/CreateButton";
import SearchInputWithButton from "../common/SearchInputWithButton";

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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    function handlePageChange(newPageNumber) {
        setPageNumber(newPageNumber);
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 d-flex justify-content-between">
                    <div className="custom-navbar">
                        <CreateButton destination="/Airlines/Create" title="Create Airline" />
                    </div>
                    {airlines && airlines.length > 0 && (
                        <SearchInputWithButton labelText="Search by Name:" />
                    )}
                </div>
            </div>
            <br />
            {isError && error && <div className="alert alert-danger" role="alert">{error}</div>}
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
                            <div>No airlines available</div>
                        )}
                        <div>
                            <Pagination pageNumber={pageNumber} lastPage={totalPages} onPageChange={handlePageChange} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
