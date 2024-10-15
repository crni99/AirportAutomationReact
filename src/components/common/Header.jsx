import React, { useEffect } from 'react';
import { handleSignOut, getAuthToken } from "../../utils/auth";
import { setupThemeToggle } from "../../utils/themeToggle";

export default function Header({ isUser }) {

    const isLoggedIn = getAuthToken() !== null;

    const handleSignOutClick = () => {
        handleSignOut();
    };

    useEffect(() => {
        const cleanupToggle = setupThemeToggle('darkModeToggle');
        return () => {
            if (cleanupToggle) {
                cleanupToggle();
            }
        };
    }, []);

    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">AirportAutomationReact</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <a className="nav-link" href="/Passengers">Passenger</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/TravelClasses">Travel Class</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Destinations">Destination</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Pilots">Pilot</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Airlines">Airline</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Flights">Flight</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/PlaneTickets">Plane Ticket</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button id="darkModeToggle" className="btn btn-secondary">Dark Mode</button>
                            </li>
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <a className="nav-link" href="/HealthCheck">Status Check</a>
                                </li>
                            )}
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <a id="signOut" className="nav-link" onClick={handleSignOutClick} href="/">Sign Out</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}