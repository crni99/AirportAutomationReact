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
import { validateFields } from '../../utils/validation/validateFields.js';

export default function ApiUserEditForm() {
    const dataCtx = useContext(DataContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        roles: '',
        error: null,
        isPending: false,
    });

    const { data: apiUserData, fetchError, isLoading, isError } = useFetch('ApiUsers', id);

    useEffect(() => {
        if (apiUserData) {
            setFormData((prevState) => ({ ...prevState, 
                username: apiUserData.username || '',
                password: apiUserData.password || '',
                roles: apiUserData.roles || ''
            }));
        }
    }, [apiUserData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errorMessage = validateFields('ApiUser', formData, ['username', 'password', 'roles']);
        if (errorMessage) {
            setFormData({
                ...formData,
                error: errorMessage,
            });
            return;
        }

        const apiUser = {
            Id: id,
            UserName: formData.username,
            Password: formData.password,
            Roles: formData.roles
        };

        setFormData((prevState) => ({ ...prevState, isPending: true }));

        try {
            const edit = await editData(apiUser, 'ApiUsers', id, dataCtx.apiUrl, navigate);

            if (edit) {
                console.error('Error updating api user:', edit.message);
                setFormData({ ...formData, error: edit.message, isPending: false });
            } else {
                setFormData({ name: '', error: null, isPending: false });
            }
        } catch (err) {
            console.error('Error during API call:', err);
            setFormData({ ...formData, error: 'Failed to update api user. Please try again.', isPending: false });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => {
            const newError = validateFields('ApiUser', { ...prev, [name]: value }, ['username', 'password', 'roles']);
            return { ...prev, [name]: value, error: newError };
        });
    };

    return (
        <>
            <PageTitle title='Edit Api User' />
            <div className="col-md-4">
                {formData.isPending && <LoadingSpinner />}
                <form onSubmit={handleSubmit}>
                    <div className="form-group pb-4">
                        <label htmlFor="username" className="control-label">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group pb-4">
                        <label htmlFor="password" className="control-label">Password</label>
                        <input
                            id="password"
                            type="text"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group pb-4">
                        <label htmlFor="roles" className="control-label">Roles</label>
                        <input
                            id="roles"
                            type="text"
                            className="form-control"
                            name="roles"
                            value={formData.roles}
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
                    <BackToListAction dataType="ApiUsers" />
                </ul>
            </nav>
        </>
    );
}