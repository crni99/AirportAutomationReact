export default function FlightsListTable( {flights }) {
    return (
        <div>
            <hr />
            <table className="table table-responsive table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Departure Date</th>
                        <th>Departure Time</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {flights.map(flight => (
                        <tr key={flight.id} className="clickable-row" onClick={() => window.open(`/Flights/${flight.id}`, '_blank')}>
                            <td>{flight.id}</td>
                            <td>{flight.departureDate}</td>
                            <td>{flight.departureTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}