import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-top footer text-muted">
            <div className="container footer-text">
                {currentYear} &copy; Airport Automation React |
                Powered by <a href="https://github.com/crni99" className="btn-primary" target="_blank" rel="noopener noreferrer">Ognjen</a>
            </div>
        </footer>
    );
}
