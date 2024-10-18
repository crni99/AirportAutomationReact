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

const DATA_TYPE = "ApiUsers";

export default function ApiUserDetails() {
    const dataCtx = useContext(DataContext);
    const { id } = useParams();
    const { data: apiUser, dataExist, error, isLoading } = useFetch(DATA_TYPE, id);
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
            <PageTitle title='Api User Details' />
            {(isLoading || operationState.isPending) && <LoadingSpinner />}
            {error && <Alert alertType="error" alertText={error.message} />}
            {operationState.operationError && <Alert alertType="error" alertText={operationState.operationError} />}
            {dataExist && (
                <>
                    <div>
                        <br />
                        <dl className="row">
                            <dt className="col-sm-2">Id</dt>
                            <dd className="col-sm-10">{apiUser.apiUserId}</dd>
                            <dt className="col-sm-2">Username</dt>
                            <dd className="col-sm-10">{apiUser.userName}</dd>
                            <dt className="col-sm-2">Password</dt>
                            <dd className="col-sm-10">{apiUser.password}</dd>
                            <dt className="col-sm-2">Roles</dt>
                            <dd className="col-sm-10">{apiUser.roles}</dd>
                        </dl>
                    </div>
                    <PageNavigationActions dataType={DATA_TYPE} dataId={id} onEdit={() => handleOperation('edit')}
                        onDelete={() => handleOperation('delete')} />
                </>
            )}
        </>
    );
}
