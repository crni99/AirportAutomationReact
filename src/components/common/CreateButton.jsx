import React from 'react';

export default function CreateButton({ destination, title }) {
    return (
        <div>
            <a className="btn btn-success" href={destination}>{title}</a>
        </div>
    )
}