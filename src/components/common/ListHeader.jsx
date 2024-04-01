import React from 'react';
import PageTitle from '../common/PageTitle.jsx';
import CreateButton from "../common/CreateButton";
import SearchInputWithButton from "../common/SearchInputWithButton";

export default function ListHeader({ dataExist, dataType, createButtonTitle, searchText }) {
    return (
        <div className="row">
            <PageTitle title={dataType} />
            <div className="col-md-6 d-flex justify-content-between">
                <div className="custom-navbar">
                    <CreateButton destination={`/${dataType}/Create`} title={createButtonTitle} />
                </div>
                {dataExist && (
                    <SearchInputWithButton labelText={searchText} />
                )}
            </div>
        </div>
    )
}