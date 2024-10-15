import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createData } from '../../utils/create.js';
import PageTitle from '../common/PageTitle.jsx';
import Alert from '../common/Alert.jsx';
import BackToListAction from '../common/pagination/BackToListAction.jsx';
import { useContext } from 'react';
import { DataContext } from '../../store/data-context.jsx';
import { validateField } from '../../utils/validation.js';

export default function PilotCreateForm() {
    const dataCtx = useContext(DataContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        uprn: '',
        flyingHours: '',
        error: null,
        isPending: false,
    });

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
        setFormData({ ...formData, isPending: true, error: null });

        try {
            const create = await createData(pilot, 'Pilots', dataCtx.apiUrl, navigate);

            if (create) {
                console.error('Error creating pilot:', create.message);
                setFormData({ ...formData, error: create.message, isPending: false });
            } else {
                setFormData({ name: '', error: null, isPending: false });
            }
        } catch (err) {
            console.error('Error during API call:', err);
            setFormData({ ...formData, error: 'Failed to create pilot. Please try again.', isPending: false });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const errorMessage = validateField('Pilot', 'name', value);
        setFormData({ ...formData, [name]: value, error: errorMessage });
    };

    return (
        <>
            <PageTitle title='Create Pilot' />
            <div className="col-md-4">
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
                            placeholder="Ognjen"
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
                            placeholder="Andjelic"
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
                            placeholder="0123456789112"
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
                            placeholder="60"
                            required
                            min="0"
                            max="40000"
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
                    <BackToListAction dataType="Pilots" />
                </ul>
            </nav>
        </>
    );
}