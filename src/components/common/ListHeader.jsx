import React from 'react';
import PageTitle from '../common/PageTitle.jsx';
import CreateButton from "../common/CreateButton";
import SearchInputWithButton from "../common/SearchInputWithButton";
import { getRole } from "../../utils/auth";

export default function ListHeader({ dataExist, dataType, createButtonTitle, searchText }) {

    const isUser = getRole();

    return (
        <div className="row">
            <PageTitle title={dataType} />
            {isUser !== 'User' && (
                <div className="col-md-6 d-flex justify-content-between">
                    <div className="custom-navbar">
                        <CreateButton destination={`/${dataType}/Create`} title={createButtonTitle} />
                    </div>
                    {dataExist && (
                        <SearchInputWithButton labelText={searchText} />
                    )}
                </div>
            )}
        </div>
    )
}