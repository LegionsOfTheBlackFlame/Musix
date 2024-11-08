// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Pg from './Pg.js';
import PgMain from './PgMain.js';
import PgAbout from './PgAbout.js';
import PgLeaderboard from './PgLeaderboard.js';
import Layout from './Layout.js'; // Import Layout

function AppRouter() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Pg />} />
                    <Route path="/games" element={<PgMain />} />
                    <Route path="/about" element={<PgAbout />} />
                    <Route path="/leaderboard" element={<PgLeaderboard />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default AppRouter;
