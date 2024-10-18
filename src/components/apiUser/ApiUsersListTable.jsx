export default function ApiUsersListTable( {apiUsers }) {
    return (
        <div>
            <hr />
            <table className="table table-responsive table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Roles</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {apiUsers.map(apiUser => (
                        <tr key={apiUser.apiUserId} className="clickable-row" onClick={() => window.open(`/ApiUsers/${apiUser.apiUserId}`, '_blank')}>
                            <td>{apiUser.apiUserId}</td>
                            <td>{apiUser.userName}</td>
                            <td>{apiUser.password}</td>
                            <td>{apiUser.roles}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}