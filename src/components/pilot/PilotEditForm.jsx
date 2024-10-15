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

export default function PilotEditForm() {
    const dataCtx = useContext(DataContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        uprn: '',
        flyingHours: '',
        error: null,
        isPending: false,
    });

    const { data: pilotData, fetchError, isLoading, isError } = useFetch('Pilots', id);

    useEffect(() => {
        if (pilotData) {
            setFormData((prevState) => ({ ...prevState, 
                firstName: pilotData.firstName || '', 
                lastName: pilotData.lastName || '' ,
                uprn: pilotData.uprn || '' ,
                flyingHours: pilotData.flyingHours || '' ,
            }));
        }
    }, [pilotData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fNameError = validateField('Pilot', 'firstName', formData.firstName);
        const lNameError = validateField('Pilot', 'lastName', formData.lastName);
        const uprnError = validateField('Pilot', 'uprn', formData.uprn);
        const flyingHoursError = validateField('Pilot', 'flyingHours', formData.flyingHours);
        if (fNameError || lNameError || uprnError || flyingHoursError) {
            setFormData({
                ...formData,
                error: fNameError || lNameError || uprnError || flyingHoursError,
            });
            return;
        }

        const pilot = { 
            FirstName: formData.firstName, 
            LastName: formData.lastName,
            UPRN: formData.uprn,
            FlyingHours: formData.flyingHours,
        };

        setFormData((prevState) => ({ ...prevState, isPending: true }));

        try {
            const edit = await editData(pilot, 'Pilot', id, dataCtx.apiUrl, navigate);

            if (edit) {
                console.error('Error updating pilot:', edit.message);
                setFormData({ ...formData, error: edit.message, isPending: false });
            } else {
                setFormData({ name: '', error: null, isPending: false });
            }
        } catch (err) {
            console.error('Error during API call:', err);
            setFormData({ ...formData, error: 'Failed to update pilot. Please try again.', isPending: false });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const errorMessage = validateField('Pilot', name, value);
        setFormData((prevState) => ({ ...prevState, [name]: value, error: errorMessage }));
    };

    return (
        <>
            <PageTitle title='Edit Pilot' />
            <div className="col-md-4">
                {formData.isPending && <LoadingSpinner />}
                <form onSubmit={handleSubmit}>
                    <div className="form-group pb-3">
                        <label htmlFor="firstName" className="control-label">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group pb-3">
                        <label htmlFor="lastName" className="control-label">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group pb-3">
                        <label htmlFor="uprn" className="control-label">UPRN</label>
                        <input
                            id="uprn"
                            type="text"
                            className="form-control"
                            name="uprn"
                            value={formData.uprn}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group pb-4">
                        <label htmlFor="flyingHours" className="control-label">Flying Hours</label>
                        <input
                            id="flyingHours"
                            type="number"
                            className="form-control"
                            name="flyingHours"
                            value={formData.flyingHours}
                            onChange={handleChange}
                            required
                            min="0"
                            max="40000"
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
                    <BackToListAction dataType="Pilots" />
                </ul>
            </nav>
        </>
    );
}