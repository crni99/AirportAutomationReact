export default function PilotsListTable( {pilots }) {
    return (
        <div>
            <hr />
            <table className="table table-responsive table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>UPRN</th>
                        <th>Flying Hours</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {pilots.map(pilot => (
                        <tr key={pilot.id} className="clickable-row" onClick={() => window.open(`/Pilots/${pilot.id}`, '_blank')}>
                            <td>{pilot.id}</td>
                            <td>{pilot.firstName}</td>
                            <td>{pilot.lastName}</td>
                            <td>{pilot.uprn}</td>
                            <td>{pilot.flyingHours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}