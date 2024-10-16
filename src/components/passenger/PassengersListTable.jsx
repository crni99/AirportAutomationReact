import openMap from '../../utils/openMapHelper';

export default function PassengersListTable( {passengers }) {
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
                        <th>Passport</th>
                        <th>Address</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {passengers.map(passenger => (
                        <tr key={passenger.id} className="clickable-row" onClick={() => window.open(`/Passengers/${passenger.id}`, '_blank')}>
                            <td>{passenger.id}</td>
                            <td>{passenger.firstName}</td>
                            <td>{passenger.lastName}</td>
                            <td>{passenger.uprn}</td>
                            <td>{passenger.passport}</td>
                            <td className="clickable-row link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                onClick={() => openMap(passenger.address)}>
                                {passenger.address}
                            </td>
                            <td>{passenger.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}