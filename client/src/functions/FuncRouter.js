// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Pg from '../pages/Pg.js';
import PgMain from '../pages/PgMain.js';
import PgAbout from '../pages/PgAbout.js';
import PgLeaderboard from '../pages/PgLeaderboard.js';
import PgGame from '../pages/PgGame.js';
import Layout from '../Layout.js';

function AppRouter() {
    return (
        <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
            <Layout>
                <Routes>
                    <Route path="/" element={<PgGame />} />
                    <Route path="/games" element={<PgMain />} />
                    <Route path="/about" element={<PgAbout />} />
                    <Route path="/leaderboard" element={<PgLeaderboard />} />
                    <Route path="*" element={<Pg />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default AppRouter;
