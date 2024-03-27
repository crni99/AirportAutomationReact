import React from 'react';

export default function PageNavigationActions({ dataType, dataId }) {
    return (
        <div>
            <nav aria-label="Page navigation">
                <ul className="pagination pagination-container">
                    <li className="page-item">
                        <a href={`/Airline/Edit/${dataId}`} className="page-link text-success">Edit</a>
                    </li>
                    <li className="page-item">
                        <a href={`/Airline/Delete/${dataId}`} className="page-link text-danger">Delete</a>
                    </li>
                    <li className="page-item">
                        <a href="/Airline" className="page-link">Back to List</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
