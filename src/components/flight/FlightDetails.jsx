import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.jsx';
import { deleteData } from '../../utils/delete.js';
import { editData } from '../../utils/edit.js';
import PageTitle from '../common/PageTitle.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import PageNavigationActions from '../common/pagination/PageNavigationActions.jsx';
import Alert from '../common/Alert.jsx';
import { useContext } from 'react';
import { DataContext } from '../../store/data-context.jsx';
import openDetails from "../../utils/openDetailsHelper";
import { Entities } from '../../utils/const.js';
import openMap from '../../utils/openMapHelper.js';

export default function FlightDetails() {
    const dataCtx = useContext(DataContext);
    const { id } = useParams();
    const { data: flight, dataExist, error, isLoading } = useFetch(Entities.FLIGHTS, id);
    const navigate = useNavigate();

    const [operationState, setOperationState] = useState({
        operationError: null,
        isPending: false
    });

    const handleOperation = async (operation) => {
        try {
            setOperationState(prevState => ({ ...prevState, isPending: true }));
            let operationResult;

            if (operation === 'edit') {
                operationResult = await editData(Entities.FLIGHTS, id, dataCtx.apiUrl, navigate);
            } else if (operation === 'delete') {
                operationResult = await deleteData(Entities.FLIGHTS, id, dataCtx.apiUrl, navigate);
            }
            if (operationResult) {
                setOperationState(prevState => ({ ...prevState, operationError: operationResult.message }));
            }
        } catch (error) {
            setOperationState(prevState => ({ ...prevState, operationError: error.message }));
        } finally {
            setOperationState(prevState => ({ ...prevState, isPending: false }));
        }
    };

    return (
        <>
            <PageTitle title='Flight Details' />
            {(isLoading || operationState.isPending) && <LoadingSpinner />}
            {error && <Alert alertType="error" alertText={error.message} />}
            {operationState.operationError && <Alert alertType="error" alertText={operationState.operationError} />}
            {dataExist && (
                <>
                    <div>
                        <br />
                        <dl className="row">
                            <dt className="col-sm-2">Id</dt>
                            <dd className="col-sm-10">{flight.id}</dd>
                            <dt className="col-sm-2">Departure Date</dt>
                            <dd className="col-sm-10">{flight.departureDate}</dd>
                            <dt className="col-sm-2">Departure Time</dt>
                            <dd className="col-sm-10">{flight.departureTime}</dd>
                        </dl>
                        <hr></hr>
                        <dl className="row">
                            <dt className="col-sm-2">Airline Id</dt>
                            <dd className="col-sm-10">
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => openDetails('Airlines', flight.airline.id)}
                                >
                                    {flight.airline.id}
                                </button>
                            </dd>
                            <dt className="col-sm-2">Name</dt>
                            <dd className="col-sm-10">{flight.airline.name}</dd>
                        </dl>
                        <hr></hr>
                        <dl className="row">
                            <dt className="col-sm-2">Destination Id</dt>
                            <dd className="col-sm-10">
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => openDetails('Destinations', flight.destination.id)}
                                >
                                    {flight.destination.id}
                                </button>
                            </dd>
                            <dt className="col-sm-2">City</dt>
                            <dd className="col-sm-10 clickable-row link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                onClick={() => openMap(flight.destination.city)}>{flight.destination.city}
                            </dd>
                            <dt className="col-sm-2">Airport</dt>
                            <dd className="col-sm-10 clickable-row link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                onClick={() => openMap(flight.destination.airport)}>{flight.destination.airport}
                            </dd>
                        </dl>
                        <hr></hr>
                        <dl className="row">
                            <dt className="col-sm-2">Pilot Id</dt>
                            <dd className="col-sm-10">
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => openDetails('Pilots', flight.pilot.id)}
                                >
                                    {flight.pilot.id}
                                </button>
                            </dd>
                            <dt className="col-sm-2">First Name</dt>
                            <dd className="col-sm-10">{flight.pilot.firstName}</dd>
                            <dt className="col-sm-2">Last Name</dt>
                            <dd className="col-sm-10">{flight.pilot.lastName}</dd>
                            <dt className="col-sm-2">UPRN</dt>
                            <dd className="col-sm-10">{flight.pilot.uprn}</dd>
                            <dt className="col-sm-2">Flying Hours</dt>
                            <dd className="col-sm-10">{flight.pilot.flyingHours}</dd>
                        </dl>
                    </div>
                    <PageNavigationActions dataType={Entities.FLIGHTS} dataId={id} onEdit={() => handleOperation('edit')}
                        onDelete={() => handleOperation('delete')} />
                </>
            )}
        </>
    );
}
