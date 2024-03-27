import React from "react";

export function Pagination({ pageNumber, lastPage, onPageChange }) {
    return (
        <div>
            <nav aria-label="Page navigation">
                <ul className="pagination pagination-container">
                    <li className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => onPageChange(1)}>First Page</button>
                    </li>
                    <li className={`page-item ${pageNumber === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => onPageChange(pageNumber - 1)}>Previous</button>
                    </li>
                    <li className={`page-item ${pageNumber === lastPage ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => onPageChange(pageNumber + 1)}>Next</button>
                    </li>
                    <li className={`page-item ${pageNumber === lastPage ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => onPageChange(lastPage)}>Last Page</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
