import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
import { Pagination } from '../common/Pagination';
import CreateButton from "../common/CreateButton";
import SearchInputWithButton from "../common/SearchInputWithButton";

export default function PilotsList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pilots, setPilots] = useState([]);
    const { data, error, isLoading, isError } = useFetch('Pilots', null, pageNumber);

    useEffect(() => {
        if (data) {
            setPilots(data.data);
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
                    <CreateButton destination="/Pilots/Create" title="Create Pilot"/>
                    </div>
                    {pilots && pilots.length > 0 && (
                        <SearchInputWithButton labelText="Search by Name:" />
                    )}
                </div>
            </div>
            <br />
            {isLoading && <div>Loading...</div>}
            {isError && error && <div className="alert alert-danger" role="alert">{error}</div>}
            {!isError && !isLoading && (
                <div className="form-horizontal">
                    <div className="form-group">
                        {pilots && pilots.length > 0 ? (
                            <div>
                                <hr />
                                <table className="table table-responsive table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>UPRN</th>
                                            <th>Flying Hours</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody">
                                        {pilots.map(pilot => (
                                            <tr key={pilot.id} className="clickable-row" onClick={() => window.open(`/Pilots/${pilot.id}`, '_blank')}>
                                                <td>{pilot.id}</td>
                                                <td>{pilot.firstName}</td>
                                                <td>{pilot.lastName}</td>
                                                <td>{pilot.uprn}</td>
                                                <td>{pilot.flyingHours}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div>No pilots available</div>
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
