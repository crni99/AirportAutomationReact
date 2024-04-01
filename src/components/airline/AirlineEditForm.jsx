import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../store/data-context.jsx';
import { editData } from '../../util/edit.js';
import PageTitle from '../common/PageTitle.jsx';
import LoadingSpinner from '../common/LoadingSpinner';
import Alert from '../common/Alert.jsx';
import BackToListAction from '../common/pagination/BackToListAction.jsx';
import useFetch from '../../hooks/useFetch.jsx';

export default function AirlineEditForm() {
    const dataCtx = useContext(DataContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        error: null,
        isPending: false
    });

    const { data: airlineData, fetchError, isLoading, isError } = useFetch('Airlines', id);
    useEffect(() => {
        if (airlineData) {
            setFormData(prevState => ({ ...prevState, name: airlineData.name || '' }));
        }
    }, [airlineData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const airline = {
            Id: id,
            Name: formData.name
        }

        setFormData({ ...formData, isPending: true });
        const edit = await editData(airline, 'Airlines', id, dataCtx.apiUrl, navigate);

        if (edit) {
            console.error('Error creating airline:', edit);
            setFormData({ ...formData, error: edit });
        } else {
            setFormData({ name: '', error: null, isPending: false });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value })); // Update the specific field in formData state
    };

    return (
        <>
            <PageTitle title='Edit Airline' />
            <div className="col-md-4">
                {formData.isPending && <LoadingSpinner />}
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
                            required
                            maxLength="255"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success" disabled={formData.isPending}>{formData.isPending ? 'Submitting...' : 'Save Changes'}</button>
                    </div>
                    {isLoading && <Alert alertType="info" alertText="Loading..." />}
                    {isError && <Alert alertType="error" alertText={fetchError} />}
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
