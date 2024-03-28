import React from 'react';
import { handleSignOut, getAuthToken } from "../../util/auth";

export default function Header() {

    const isLoggedIn = getAuthToken() !== null;

    const handleSignOutClick = () => {
        handleSignOut();
    };

    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">AirportAutomationReact</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/Passengers">Passenger</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/TravelClasses">Travel Class</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/Destinations">Destination</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/Pilots">Pilot</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/Airlines">Airline</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/Flights">Flight</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/PlaneTickets">Plane Ticket</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <a id="signOut" className="nav-link text-dark" onClick={handleSignOutClick} href="/">Sign Out</a>
                                </li>
                            )}
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="/HealthCheck">Status Check</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}