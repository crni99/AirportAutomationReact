import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import PageNavigationActions from '../common/PageNavigationActions';

export default function AirlineDetails() {
    const { id } = useParams();
    const { data: airline, error, isLoading } = useFetch('Airlines', id);

    return (
        <div className="container">
            <main role="main" className="pb-3">
                {isLoading && <div>Loading...</div>}
                {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
                {airline && (
                    <div>
                        <h4>Airline Details</h4>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-2">Id</dt>
                            <dd className="col-sm-10">{airline.id}</dd>
                            <dt className="col-sm-2">Name</dt>
                            <dd className="col-sm-10">{airline.name}</dd>
                        </dl>
                    </div>
                )}
                <PageNavigationActions dataType="/Airlines" dataId={id}/>
            </main>
        </div>
    );
}
