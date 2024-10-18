import openMap from "../../utils/openMapHelper"

export default function DestinationsListTable( {destinations }) {
    return (
        <div>
            <hr />
            <table className="table table-responsive table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>City</th>
                        <th>Airport</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {destinations.map(destination => (
                        <tr key={destination.id} className="clickable-row" onClick={() => window.open(`/Destinations/${destination.id}`, '_blank')}>
                            <td>{destination.id}</td>
                            <td className="clickable-row link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                onClick={() => openMap(destination.airport)}>
                                {destination.city}
                            </td>
                            <td className="clickable-row link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                onClick={() => openMap(destination.airport)}>
                                {destination.airport}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}