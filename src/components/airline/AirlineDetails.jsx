import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { deleteData } from '../../util/delete'
import { useNavigate } from 'react-router-dom';
import PageNavigationActions from '../common/pagination/PageNavigationActions';
import Alert from '../common/Alert';

const DATA_TYPE = "Airlines";

export default function AirlineDetails() {
    const { id } = useParams();
    const { data: airline, error, isLoading } = useFetch(DATA_TYPE, id);
    const navigate = useNavigate();
    const [deleteError, setDeleteError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const handleDelete = async () => {
        try {
            setIsPending(true);
            const deleteResult = await deleteData(DATA_TYPE, id, navigate);
            
            if (deleteResult) {
                console.error('Error deleting airline:', deleteResult);
                setDeleteError(deleteResult);
            }
        } catch (deleteError) {
            console.error('Error deleting airline:', deleteError);
            setDeleteError(deleteError.message);
        } finally {
            setIsPending(false);
        }
    };

    const handleEdit = async () => {
        return <h1> EDITED </h1>;
    }

    return (
        <>
            <h1 className="text-center">Airline Details</h1>
            {isLoading && <Alert alertType="info" alertText="Loading..." />}
            {isPending && <Alert alertType="info" alertText="Loading..." />}
            {error && <Alert alertType="error" alertText={error} />}
            {deleteError && <Alert alertType="error" alertText={deleteError} />}
            {airline && (
                <>
                    <div>
                        <hr />
                        <dl className="row">
                            <dt className="col-sm-2">Id</dt>
                            <dd className="col-sm-10">{airline.id}</dd>
                            <dt className="col-sm-2">Name</dt>
                            <dd className="col-sm-10">{airline.name}</dd>
                        </dl>
                    </div>
                    <PageNavigationActions dataType={DATA_TYPE} dataId={id} onEdit={handleEdit} onDelete={handleDelete}/>
                </>
            )}
        </>
    );
}
