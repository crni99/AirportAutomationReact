import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createData } from '../../util/create.js';
import Alert from '../common/Alert';
import BackToListAction from '../common/pagination/BackToListAction.jsx';

export default function AirlineForm() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const airline = {
            Name: name
        }

        setIsPending(true);
        const create = await createData(airline, 'Airlines', navigate);

        if (create) {
            console.error('Error creating airline:', create);
            setError(create);
        } else {
            setName('');
            setError(null);
        }
        setIsPending(false);
    };

    return (
        <>
            <h1 className="text-center">Create Airline</h1>
            <div className="col-md-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-group pb-4">
                        <label htmlFor="name" className="control-label">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Air Serbia"
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                            maxLength="255"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success" disabled={isPending}>{isPending ? 'Creating...' : 'Create'}</button>
                    </div>
                    {error && <Alert alertType="error" alertText={error} />}
                </form>
            </div>
            <nav aria-label="Page navigation">
                <ul className="pagination pagination-container pagination-container-absolute">
                    <BackToListAction dataType="Airlines" />
                </ul>
            </nav>
        </>
    );
}
