import React from 'react';
import CreateButton from "../common/CreateButton";
import SearchInputWithButton from "../common/SearchInputWithButton";

export default function ListHeader({ data, dataType, createButtonTitle, searchText }) {
    return (
        <div className="row">
            <h1 className="text-center">{dataType}</h1>
            <div className="col-md-6 d-flex justify-content-between">
                <div className="custom-navbar">
                    <CreateButton destination={`/${dataType}/Create`} title={createButtonTitle} />
                </div>
                {data && data.length > 0 && (
                    <SearchInputWithButton labelText={searchText} />
                )}
            </div>
        </div>
    )
}