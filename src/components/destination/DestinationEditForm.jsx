import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../store/data-context.jsx';
import { editData } from '../../utils/edit.js';
import PageTitle from '../common/PageTitle.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import Alert from '../common/Alert.jsx';
import BackToListAction from '../common/pagination/BackToListAction.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import { validateField } from '../../utils/validation.js';

export default function DestinationEditForm() {
    const dataCtx = useContext(DataContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        city: '',
        airport: '',
        error: null,
        isPending: false,
    });

    const { data: destinationData, fetchError, isLoading, isError } = useFetch('Destinations', id);

    useEffect(() => {
        if (destinationData) {
            setFormData((prevState) => ({ ...prevState, city: destinationData.city || '', airport: destinationData.airport || '' }));
        }
    }, [destinationData]);

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

        const destination = {
            Id: id,
            City: formData.city,
            Airport: formData.airport
        };

        setFormData((prevState) => ({ ...prevState, isPending: true }));

        try {
            const edit = await editData(destination, 'Destinations', id, dataCtx.apiUrl, navigate);

            if (edit) {
                console.error('Error updating destination:', edit.message);
                setFormData({ ...formData, error: edit.message, isPending: false });
            } else {
                setFormData({ name: '', error: null, isPending: false });
            }
        } catch (err) {
            console.error('Error during API call:', err);
            setFormData({ ...formData, error: 'Failed to update destination. Please try again.', isPending: false });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const errorMessage = validateField('Destination', name, value);
        setFormData((prevState) => ({ ...prevState, [name]: value, error: errorMessage }));
    };

    return (
        <>
            <PageTitle title='Edit Destination' />
            <div className="col-md-4">
                {formData.isPending && <LoadingSpinner />}
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
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success" disabled={formData.isPending}>
                            {formData.isPending ? 'Submitting...' : 'Save Changes'}
                        </button>
                    </div>
                    {isLoading && <Alert alertType="info" alertText="Loading..." />}
                    {isError && <Alert alertType="error" alertText={fetchError} />}
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