import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createData } from '../../util/create.js';

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
        <div className="container">
            <main role="main" className="pb-3">
                <h4>Create Airline</h4>
                <hr />
                <div className="row">
                    <div className="col-md-4">
                        <form onSubmit={handleSubmit}>
                            {error && <div className="text-danger">{error}</div>}
                            <div className="form-group pb-4">
                                <label htmlFor="name" className="control-label">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success" disabled={isPending}>{isPending ? 'Creating...' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination pagination-container pagination-container-absolute">
                        <li className="page-item">
                            <a className="page-link" href="/Airline">Back to List</a>
                        </li>
                    </ul>
                </nav>
            </main>
        </div>
    );
}
