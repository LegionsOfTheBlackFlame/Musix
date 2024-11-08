// Layout.js
import React from 'react';
import SpinningEarth from './components/CompSphere.js'; // Import SpinningEarth
import Navbar from './components/CompNavbar.js'; // Import Navbar

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            {/* Background Sphere */}
            <SpinningEarth />

            {/* Navbar */}
            <Navbar /> {/* Navbar will always appear above the sphere */}

            {/* Main Content */}
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
