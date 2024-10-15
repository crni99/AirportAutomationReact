import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createData } from '../../utils/create.js';
import PageTitle from '../common/PageTitle.jsx';
import Alert from '../common/Alert.jsx';
import BackToListAction from '../common/pagination/BackToListAction.jsx';
import { useContext } from 'react';
import { DataContext } from '../../store/data-context.jsx';
import { validateField } from '../../utils/validation.js';

export default function DestinationCreateForm() {
    const dataCtx = useContext(DataContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        city: '',
        airport: '',
        error: null,
        isPending: false,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cityError = validateField('Destination', 'city', formData.city);
        const airportError = validateField('Destination', 'airport', formData.airport);
        if (cityError || airportError) {
            setFormData({
                ...formData,
                error: cityError || airportError,
            });
            return;
        }

        const destination = { City: formData.city, Airport: formData.airport };
        setFormData({ ...formData, isPending: true, error: null });

        try {
            const create = await createData(destination, 'Destinations', dataCtx.apiUrl, navigate);

            if (create) {
                console.error('Error creating destination:', create.message);
                setFormData({ ...formData, error: create.message, isPending: false });
            } else {
                setFormData({ name: '', error: null, isPending: false });
            }
        } catch (err) {
            console.error('Error during API call:', err);
            setFormData({ ...formData, error: 'Failed to create destination. Please try again.', isPending: false });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const errorMessage = validateField('Destination', 'name', value);
        setFormData({ ...formData, [name]: value, error: errorMessage });
    };

    return (
        <>
            <PageTitle title='Create Destination' />
            <div className="col-md-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-group pb-3">
                        <label htmlFor="city" className="control-label">City</label>
                        <input
                            id="city"
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Belgrade"
                            required
                        />
                    </div>
                    <div className="form-group pb-4">
                        <label htmlFor="airport" className="control-label">Airport</label>
                        <input
                            id="airport"
                            type="text"
                            className="form-control"
                            name="airport"
                            value={formData.airport}
                            onChange={handleChange}
                            placeholder="Belgrade Nikola Tesla Airport"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success" disabled={formData.isPending}>
                            {formData.isPending ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                    {formData.error && <Alert alertType="error" alertText={formData.error} />}
                </form>
            </div>
            <nav aria-label="Page navigation">
                <ul className="pagination pagination-container pagination-container-absolute">
                    <BackToListAction dataType="Destinations" />
                </ul>
            </nav>
        </>
    );
}