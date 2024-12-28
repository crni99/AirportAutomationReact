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
import { Entities } from '../../utils/const.js';

export default function PilotDetails() {
    const dataCtx = useContext(DataContext);
    const { id } = useParams();
    const { data: pilot, dataExist, error, isLoading } = useFetch(Entities.PILOTS, id);
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
                operationResult = await editData(Entities.PILOTS, id, dataCtx.apiUrl, navigate);
            } else if (operation === 'delete') {
                operationResult = await deleteData(Entities.PILOTS, id, dataCtx.apiUrl, navigate);
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
            <PageTitle title='Pilot Details' />
            {(isLoading || operationState.isPending) && <LoadingSpinner />}
            {error && <Alert alertType="error" alertText={error.message} />}
            {operationState.operationError && <Alert alertType="error" alertText={operationState.operationError} />}
            {dataExist && (
                <>
                    <div>
                        <br />
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
                    <PageNavigationActions dataType={Entities.PILOTS} dataId={id} onEdit={() => handleOperation('edit')}
                        onDelete={() => handleOperation('delete')} />
                </>
            )}
        </>
    );
}
