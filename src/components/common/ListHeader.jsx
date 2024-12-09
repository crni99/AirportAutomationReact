import React from 'react';
import CreateButton from "../common/CreateButton";
import SearchInputWithButton from "../common/SearchInputWithButton";
import { getRole } from "../../utils/auth";

export default function ListHeader({ dataExist, dataType, createButtonTitle }) {

    const isUser = getRole();

    return (
        <div className="container container-spacing-top">
            <div className="row justify-content-between">
                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center" style={{ width: '100%' }}>
                        {isUser !== 'User' && (
                            <CreateButton destination={`/${dataType}/Create`} title={createButtonTitle} />
                        )}
                        {dataExist && (
                            <div className="d-flex">
                                <SearchInputWithButton type={dataType} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}