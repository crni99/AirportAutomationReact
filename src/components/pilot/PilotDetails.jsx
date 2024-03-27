import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

export default function PilotDetails() {
    const { id } = useParams();
    const { data: pilot, error, isLoading } = useFetch('Pilots', id);

    return (
        <div className="container">
            <main role="main" className="pb-3">
                {isLoading && <div>Loading...</div>}
                {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
                {pilot && (
                    <div>
                        <h4>Pilot Details</h4>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-2">Id</dt>
                            <dd className="col-sm-10">{pilot.id}</dd>
                            <dt className="col-sm-2">First Name</dt>
                            <dd className="col-sm-10">{pilot.firstName}</dd>
                            <dt className="col-sm-2">Last Name</dt>
                            <dd className="col-sm-10">{pilot.lastName}</dd>
                            <dt className="col-sm-2">UPRN</dt>
                            <dd className="col-sm-10">{pilot.uprn}</dd>
                            <dt className="col-sm-2">Flying Hours</dt>
                            <dd className="col-sm-10">{pilot.flyingHours}</dd>
                        </dl>
                    </div>
                )}
            </main>
        </div>
    );
}
