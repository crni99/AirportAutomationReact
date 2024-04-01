import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { deleteData } from '../../util/delete';
import { editData } from '../../util/edit.js';
import PageTitle from '../common/PageTitle.jsx';
import LoadingSpinner from '../common/LoadingSpinner';
import PageNavigationActions from '../common/pagination/PageNavigationActions';
import Alert from '../common/Alert';
import { useContext } from 'react';
import { DataContext } from '../../store/data-context';

const DATA_TYPE = "Airlines";

export default function AirlineDetails() {
    const dataCtx = useContext(DataContext);
    const { id } = useParams();
    const { data: airline, dataExist, error, isLoading } = useFetch(DATA_TYPE, id);
    const navigate = useNavigate();

    // Consolidating state variables into a single object
    const [operationState, setOperationState] = useState({
        operationError: null,
        isPending: false
    });

    const handleOperation = async (operation) => {
        try {
            setOperationState({ ...operationState, isPending: true });
            let operationResult;

            if (operation === 'edit') {
                operationResult = await editData(DATA_TYPE, id, dataCtx.apiUrl, navigate);
            } else if (operation === 'delete') {
                operationResult = await deleteData(DATA_TYPE, id, dataCtx.apiUrl, navigate);
            }

            if (operationResult) {
                console.error(`Error ${operation}ing airline:`, operationResult);
                setOperationState({ ...operationState, operationError: operationResult });
            }
        } catch (operationError) {
            console.error(`Error ${operation}ing airline:`, operationError);
            setOperationState({ ...operationState, operationError: operationError.message });
        } finally {
            setOperationState({ ...operationState, isPending: false });
        }
    };

    return (
        <>
            <PageTitle title='Airline Details' />
            {(isLoading || operationState.isPending) && <LoadingSpinner />}
            {error && <Alert alertType="error" alertText={error} />}
            {operationState.operationError && <Alert alertType="error" alertText={operationState.operationError} />}
            {dataExist && (
                <>
                    <div>
                        <br />
                        <dl className="row">
                            <dt className="col-sm-2">Id</dt>
                            <dd className="col-sm-10">{airline.id}</dd>
                            <dt className="col-sm-2">Name</dt>
                            <dd className="col-sm-10">{airline.name}</dd>
                        </dl>
                    </div>
                    <PageNavigationActions dataType={DATA_TYPE} dataId={id} onEdit={() => handleOperation('edit')}
                        onDelete={() => handleOperation('delete')} />
                </>
            )}
        </>
    );
}
