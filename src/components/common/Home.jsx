import React, { useState } from 'react';
import { useContext } from 'react';
import { DataContext } from '../../store/data-context';
import { getAuthToken, authenticateUser } from '../../util/auth';
import Alert from '../common/Alert';

export default function Home() {
    const dataCtx = useContext(DataContext);
    const isLoggedIn = getAuthToken() !== null;
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const authError = await authenticateUser(userName, password, dataCtx.apiUrl);
            if (authError) {
                setError(authError.message);
            } else {
                setError(null);
            }

        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    };


    return (
        <div className="container">
            <main role="main" className="pb-3">
                <div>
                    <div className="form-horizontal">
                        <div className="form-group">
                            <h1>Airport Automation React</h1>
                            <p>The time is {new Date().toLocaleString()}</p>
                        </div>
                    </div>
                    {!isLoggedIn &&
                        <div className="row">
                            <div className="col-md-4">
                                {error && <Alert alertType="error" alertText={error} />}
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-group pb-3">
                                        <label htmlFor="UserName" className="control-label">Username</label>
                                        <input
                                            id="UserName"
                                            name="UserName"
                                            maxLength="50"
                                            className="form-control"
                                            required
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group pb-4">
                                        <label htmlFor="Password" className="control-label">Password</label>
                                        <input
                                            id="Password"
                                            name="Password"
                                            type="password"
                                            maxLength="50"
                                            className="form-control"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Sign In</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </main>
        </div>
    );
}
