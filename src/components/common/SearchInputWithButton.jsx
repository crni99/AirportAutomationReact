import React from 'react';

export default function SearchInputWithButton({ type }) {
    const renderInput = () => {
        switch (type) {
            case 'Airlines':
                return (
                    <div className="input-group me-3" style={{ width: '70%' }}>
                        <label htmlFor="searchInput" className="input-group-text">Name:</label>
                        <input
                            type="text"
                            id="searchInput"
                            className="form-control"
                            placeholder="Air Serbia"
                            required
                        />
                        <button id="searchButton" className="btn btn-primary">Search</button>
                    </div>
                );

            case 'Destinations':
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
                        <div class="input-group me-3">
                            <label htmlFor="airport" className="input-group-text">Airport:</label>
                            <input
                                type="text"
                                id="airport"
                                className="form-control"
                                placeholder="Belgrade Nikola Tesla"
                                required />
                            <button id="searchButton" className="btn btn-primary">Search</button>
                        </div>
                    </>
                );

            case 'Flights':
                return (
                    <>
                        <div className="input-group me-3">
                            <label htmlFor="startDate" className="input-group-text">Start Date:</label>
                            <input
                                type="text"
                                id="startDate"
                                className="form-control"
                                placeholder="10.06.2023."
                                required />
                        </div>
                        <div className="input-group me-3">
                            <label htmlFor="endDate" className="input-group-text">End Date:</label>
                            <input
                                type="text"
                                id="endDate"
                                className="form-control"
                                placeholder="14.06.2023."
                                required />
                            <button id="searchButton" className="btn btn-primary">Search</button>
                        </div>
                    </>
                );

            case 'Passengers':
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
                            <button id="searchButton" className="btn btn-primary">Search</button>
                        </div>
                    </>
                );

            case 'Pilots':
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
                            <button id="searchButton" className="btn btn-primary">Search</button>
                        </div>
                    </>
                );

            case 'PlaneTickets':
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
                            <button id="searchButton" className="btn btn-primary">Search</button>
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