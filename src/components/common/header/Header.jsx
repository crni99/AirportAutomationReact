import React, { useEffect } from 'react';
import { handleSignOut, getAuthToken, getRole } from "../../../utils/auth";
import { setupThemeToggle } from "../../../utils/themeToggle";
import NavItem from './NavItem';

export default function Header() {

    const isLoggedIn = getAuthToken() !== null;
    const role = getRole();

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
                    {isLoggedIn && (
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    )}
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        {isLoggedIn && (
                            <ul className="navbar-nav flex-grow-1">
                                <NavItem type='Passengers' text='Passenger' />
                                <NavItem type='TravelClasses' text='Travel Class' />
                                <NavItem type='Destinations' text='Destination' />
                                <NavItem type='Pilots' text='Pilot' />
                                <NavItem type='Airlines' text='Airline' />
                                <NavItem type='Flights' text='Flight' />
                                <NavItem type='PlaneTickets' text='Plane Ticket' />
                                {role === 'SuperAdmin' && (
                                    <NavItem type='ApiUsers' text='Api User' />
                                )}
                            </ul>
                        )}
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button id="darkModeToggle" className="btn btn-secondary">Dark Mode</button>
                            </li>
                            {isLoggedIn && (
                                <NavItem type='HealthCheck' text='Status Check' />
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