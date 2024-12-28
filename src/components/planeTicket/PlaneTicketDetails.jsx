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
import openDetails from "../../utils/openDetailsHelper.js";
import { Entities } from '../../utils/const.js';

export default function PlaneTicketDetails() {
    const dataCtx = useContext(DataContext);
    const { id } = useParams();
    const { data: planeTicket, dataExist, error, isLoading } = useFetch(Entities.PLANE_TICKETS, id);
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
                operationResult = await editData(Entities.PLANE_TICKETS, id, dataCtx.apiUrl, navigate);
            } else if (operation === 'delete') {
                operationResult = await deleteData(Entities.PLANE_TICKETS, id, dataCtx.apiUrl, navigate);
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
            <PageTitle title='Plane Ticket Details' />
            {(isLoading || operationState.isPending) && <LoadingSpinner />}
            {error && <Alert alertType="error" alertText={error.message} />}
            {operationState.operationError && <Alert alertType="error" alertText={operationState.operationError} />}
            {dataExist && (
                <>
                    <div>
                        <br />
                        <dl className="row">
                            <dt className="col-sm-2">Id</dt>
                            <dd className="col-sm-10">{planeTicket.id}</dd>
                            <dt className="col-sm-2">Price</dt>
                            <dd className="col-sm-10">{planeTicket.price}</dd>
                            <dt className="col-sm-2">Purchase Date</dt>
                            <dd className="col-sm-10">{planeTicket.purchaseDate}</dd>
                            <dt className="col-sm-2">Seat Number</dt>
                            <dd className="col-sm-10">{planeTicket.seatNumber}</dd>
                        </dl>
                        <hr></hr>
                        <dl className="row">
                            <dt className="col-sm-2">Passenger Id</dt>
                            <dd className="col-sm-10">
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => openDetails('Passengers', planeTicket.passenger.id)}
                                >
                                    {planeTicket.passenger.id}
                                </button>
                            </dd>
                            <dt className="col-sm-2">First Name</dt>
                            <dd className="col-sm-10">{planeTicket.passenger.firstName}</dd>
                            <dt className="col-sm-2">Last Name</dt>
                            <dd className="col-sm-10">{planeTicket.passenger.lastName}</dd>
                        </dl>
                        <hr></hr>
                        <dl className="row">
                            <dt className="col-sm-2">Travel Class Id</dt>
                            <dd className="col-sm-10">
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => openDetails('TravelClasses', null)}
                                >
                                    {planeTicket.travelClass.id}
                                </button>
                            </dd>
                            <dt className="col-sm-2">Type</dt>
                            <dd className="col-sm-10">{planeTicket.travelClass.type}</dd>
                        </dl>
                        <hr></hr>
                        <dl className="row">
                            <dt className="col-sm-2">Id</dt>
                            <dd className="col-sm-10">
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => openDetails('Flights', planeTicket.flight.id)}
                                >
                                    {planeTicket.flight.id}
                                </button>
                            </dd>
                            <dt className="col-sm-2">Departure Date</dt>
                            <dd className="col-sm-10">{planeTicket.flight.departureDate}</dd>
                            <dt className="col-sm-2">Departure Time</dt>
                            <dd className="col-sm-10">{planeTicket.flight.departureTime}</dd>
                        </dl>
                    </div>
                    <PageNavigationActions dataType={Entities.PLANE_TICKETS} dataId={id} onEdit={() => handleOperation('edit')}
                        onDelete={() => handleOperation('delete')} />
                </>
            )}
        </>
    );
}
