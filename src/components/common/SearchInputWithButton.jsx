import React from 'react';
import { Entities } from '../../utils/const';

export default function SearchInputWithButton({ type, setTriggerFetch }) {

    const handleSearch = () => {
        setTriggerFetch(true);
    };

    const renderInput = () => {
        switch (type) {
            case Entities.AIRLINES:
                return (
                    <div className="input-group me-3">
                        <label htmlFor="searchInput" className="input-group-text">Name:</label>
                        <input
                            type="text"
                            id="searchInput"
                            className="form-control"
                            placeholder="Air Serbia"
                            required
                        />
                        <button id="searchButton" className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>
                );

            case Entities.API_USERS:
                return (
                    <div className="input-group me-3">
                        <label htmlFor="roleSelect" className="input-group-text">Role:</label>
                        <select id="roleSelect" className="form-control" required>
                            <option value="" disabled selected>Select a role</option>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            <option value="SuperAdmin">Super Admin</option>
                        </select>
                        <button id="searchButton" className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>
                );

            case Entities.DESTINATIONS:
                return (
                    <>
                        <div className="input-group me-3">
                            <label htmlFor="city" className="input-group-text">City:</label>
                            <input
                                type="text"
                                id="city"
                                className="form-control"
                                placeholder="Belgrade"
                                required />
                        </div>
                        <div className="input-group me-3">
                            <label htmlFor="airport" className="input-group-text">Airport:</label>
                            <input
                                type="text"
                                id="airport"
                                className="form-control"
                                placeholder="Belgrade Nikola Tesla"
                                required />
                            <button id="searchButton" className="btn btn-primary" onClick={handleSearch}>Search</button>
                        </div>
                    </>
                );

            case Entities.FLIGHTS:
                return (
                    <>
                        <div className="input-group me-3">
                            <label htmlFor="startDate" className="input-group-text">Start Date:</label>
                            <input
                                type="text"
                                id="startDate"
                                className="form-control"
                                placeholder="2023-06-07"
                                required />
                        </div>
                        <div className="input-group me-3">
                            <label htmlFor="endDate" className="input-group-text">End Date:</label>
                            <input
                                type="text"
                                id="endDate"
                                className="form-control"
                                placeholder="2023-14-06"
                                required />
                            <button id="searchButton" className="btn btn-primary" onClick={handleSearch}>Search</button>
                        </div>
                    </>
                );

            case Entities.PASSENGERS:
                return (
                    <>
                        <div className="input-group me-3">
                            <label htmlFor="firstName" className="input-group-text">First name:</label>
                            <input
                                type="text"
                                id="firstName"
                                className="form-control"
                                placeholder="Ognjen"
                                required />
                        </div>
                        <div className="input-group me-3">
                            <label htmlFor="lastName" className="input-group-text">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                className="form-control"
                                placeholder="Andjelic"
                                required />
                            <button id="searchButton" className="btn btn-primary" onClick={handleSearch}>Search</button>
                        </div>
                    </>
                );

            case Entities.PILOTS:
                return (
                    <>
                        <div className="input-group me-3">
                            <label htmlFor="firstName" className="input-group-text">First name:</label>
                            <input
                                type="text"
                                id="firstName"
                                className="form-control"
                                placeholder="Ognjen"
                                required />
                        </div>
                        <div className="input-group me-3">
                            <label htmlFor="lastName" className="input-group-text">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                className="form-control"
                                placeholder="Andjelic"
                                required />
                            <button id="searchButton" className="btn btn-primary" onClick={handleSearch}>Search</button>
                        </div>
                    </>
                );

            case Entities.PLANE_TICKETS:
                return (
                    <>
                        <div className="input-group me-3">
                            <label htmlFor="minPrice" className="input-group-text">Min Price:</label>
                            <input
                                type="number"
                                id="minPrice"
                                className="form-control"
                                placeholder="100"
                                required />
                        </div>
                        <div className="input-group me-3">
                            <label htmlFor="maxPrice" className="input-group-text">Max Price:</label>
                            <input
                                type="number"
                                id="maxPrice"
                                className="form-control"
                                placeholder="600"
                                required />
                            <button id="searchButton" className="btn btn-primary" onClick={handleSearch}>Search</button>
                        </div>
                    </>
                );

            default:
                return (
                    <div className="input-group me-3">
                    </div>
                );
        }
    };

    return renderInput();
}