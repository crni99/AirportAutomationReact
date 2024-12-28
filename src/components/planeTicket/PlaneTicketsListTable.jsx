export default function PlaneTicketsListTable( {planeTickets }) {
    return (
        <div>
            <hr />
            <table className="table table-responsive table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Price</th>
                        <th>Purchase Date</th>
                        <th>Seat Number</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {planeTickets.map(planeTicket => (
                        <tr key={planeTicket.id} className="clickable-row" onClick={() => window.open(`/PlaneTickets/${planeTicket.id}`, '_blank')}>
                            <td>{planeTicket.id}</td>
                            <td>{planeTicket.price}</td>
                            <td>{planeTicket.purchaseDate}</td>
                            <td>{planeTicket.seatNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}