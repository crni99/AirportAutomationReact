import React from 'react';

export default function SearchInputWithButton({ labelText }) {
    return (
        <div className="input-group mb-3" style={{ width: '70%' }}>
            <label htmlFor="searchInput" className="input-group-text">{labelText}</label>
            <input type="text" id="searchInput" className="form-control" required />
            <button id="searchButton" className="btn btn-primary">Search</button>
        </div>
    );
}
