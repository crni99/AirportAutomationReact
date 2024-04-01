export default function AirlinesListTable( {airlines }) {
    return (
        <div>
            <hr />
            <table className="table table-responsive table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {airlines.map(airline => (
                        <tr key={airline.id} className="clickable-row" onClick={() => window.open(`/Airlines/${airline.id}`, '_blank')}>
                            <td>{airline.id}</td>
                            <td>{airline.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}