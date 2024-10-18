import React from 'react';
import CreateButton from "../common/CreateButton";
import SearchInputWithButton from "../common/SearchInputWithButton";
import { getRole } from "../../utils/auth";

export default function ListHeader({ dataExist, dataType, createButtonTitle }) {

    const isUser = getRole();

    return (
        <div className="container mt-5">
            <div className="row justify-content-between">
                <div className="col-md-6">
                    {isUser !== 'User' && (
                        <div className="d-flex justify-content-start mb-3">
                            <CreateButton destination={`/${dataType}/Create`} title={createButtonTitle} />
                        </div>
                    )}
                    {dataExist && (
                        <SearchInputWithButton type={dataType} />
                    )}
                </div>
            </div>
        </div>
    )
}