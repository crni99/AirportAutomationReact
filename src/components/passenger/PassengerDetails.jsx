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
import openMap from '../../utils/openMapHelper.js';

const DATA_TYPE = "Passengers";

export default function PassengerDetails() {
    const dataCtx = useContext(DataContext);
    const { id } = useParams();
    const { data: passenger, dataExist, error, isLoading } = useFetch(DATA_TYPE, id);
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
                operationResult = await editData(DATA_TYPE, id, dataCtx.apiUrl, navigate);
            } else if (operation === 'delete') {
                operationResult = await deleteData(DATA_TYPE, id, dataCtx.apiUrl, navigate);
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
            <PageTitle title='Passenger Details' />
            {(isLoading || operationState.isPending) && <LoadingSpinner />}
            {error && <Alert alertType="error" alertText={error.message} />}
            {operationState.operationError && <Alert alertType="error" alertText={operationState.operationError} />}
            {dataExist && (
                <>
                    <div>
                        <br />
                        <dl className="row">
                            <dt className="col-sm-2">Id</dt>
                            <dd className="col-sm-10">{passenger.id}</dd>
                            <dt className="col-sm-2">First Name</dt>
                            <dd className="col-sm-10">{passenger.firstName}</dd>
                            <dt className="col-sm-2">Last Name</dt>
                            <dd className="col-sm-10">{passenger.lastName}</dd>
                            <dt className="col-sm-2">UPRN</dt>
                            <dd className="col-sm-10">{passenger.uprn}</dd>
                            <dt className="col-sm-2">Passport</dt>
                            <dd className="col-sm-10">{passenger.passport}</dd>
                            <dt className="col-sm-2">Address</dt>
                            <dd className="col-sm-10 clickable-row link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" 
                                onClick={() => openMap(passenger.address)}>
                                    {passenger.address}
                            </dd>
                            <dt className="col-sm-2">Phone</dt>
                            <dd className="col-sm-10">{passenger.phone}</dd>
                        </dl>
                    </div>
                    <PageNavigationActions dataType={DATA_TYPE} dataId={id} onEdit={() => handleOperation('edit')}
                        onDelete={() => handleOperation('delete')} />
                </>
            )}
        </>
    );
}
