import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createData } from '../../util/create.js';
import PageTitle from '../common/PageTitle.jsx';
import Alert from '../common/Alert.jsx';
import BackToListAction from '../common/pagination/BackToListAction.jsx';
import { useContext } from 'react';
import { DataContext } from '../../store/data-context.jsx';

export default function AirlineCreateForm() {
    const dataCtx = useContext(DataContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        error: null,
        isPending: false
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const airline = {
            Name: formData.name
        }

        setFormData({ ...formData, isPending: true });
        const create = await createData(airline, 'Airlines', dataCtx.apiUrl, navigate);

        if (create) {
            console.error('Error creating airline:', create.message);
            setFormData({ ...formData, error: create.message });
        } else {
            setFormData({ name: '', error: null, isPending: false });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <PageTitle title='Create Airline' />
            <div className="col-md-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-group pb-4">
                        <label htmlFor="name" className="control-label">Name</label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Air Serbia"
                            required
                            maxLength="255"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success" disabled={formData.isPending}>{formData.isPending ? 'Creating...' : 'Create'}</button>
                    </div>
                    {formData.error && <Alert alertType="error" alertText={formData.error} />}
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
