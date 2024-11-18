/**
 * Layout.js
 * This component serves as the layout wrapper for the app.
 * It includes a spinning Earth background, a fixed navigation bar, 
 * and a dynamic content section for rendering child components.
 */

import React from 'react';
import SpinningEarth from './components/CompSphere.js'; // 3D spinning Earth background
import Navbar from './components/CompNavbar.js'; // Navbar for navigation links

/**
 * Layout Component
 * Wraps the application with a consistent layout structure, including:
 * - A 3D spinning Earth background
 * - A fixed navigation bar at the top
 * - A content area for dynamic child components
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Components to be rendered within the layout
 * @returns {JSX.Element} The layout structure
 */
const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            {/* Background: Spinning Earth */}
            <SpinningEarth /> {/* Always rendered in the background */}

            {/* Fixed Navbar */}
            <Navbar /> {/* Positioned above the spinning Earth */}

            {/* Main Content Area */}
            <div className="content">
                {children} {/* Render dynamic page content */}
            </div>
        </div>
    );
};

export default Layout;
