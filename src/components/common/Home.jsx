import React, { useState } from 'react';
import { authenticateUser } from '../../util/auth';

export default function Home() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await authenticateUser(userName, password);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <main role="main" className="pb-3">
                <div>
                    <div className="form-horizontal">
                        <div className="form-group">
                            <h1>Airport Automation</h1>
                            <p>The time is {new Date().toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={handleFormSubmit}>
                                <div className="form-group pb-3">
                                    <label htmlFor="UserName" className="control-label">Username</label>
                                    <input
                                        id="UserName"
                                        name="UserName"
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
                </div>
            </main>
        </div>
    );
}
