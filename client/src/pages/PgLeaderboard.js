import React, { useState, useEffect } from 'react';
import { leaderboard } from '../dataLeaderboard.js';
import CompRank from '../components/CompRank.js';
import crown from '../crown.png';

const userID = 529;

const rankMixer = (userID) => {
    console.group('Mixing ranks...');
    console.log('userID:', userID);
    const topRank = leaderboard.filter(user => user.rank < 4);
    console.log('top rank:', topRank);
    const thisUser = leaderboard.find(user => user.user_id === userID);
    console.log('this user:', thisUser);
    const prevRank = leaderboard.find(user => user.rank === thisUser.rank - 1);
    console.log('prev rank:', prevRank);
    const nextRank = leaderboard.find(user => user.rank === thisUser.rank + 1);
    console.log('next rank:', nextRank);
    console.groupEnd();
    return [...topRank, prevRank, thisUser, nextRank];
};

function PgLeaderboard() {
    const user = leaderboard.find(user => user.user_id === userID);
    const [activeLeaderboard, setActiveLeaderboard] = useState([]);

    useEffect(() => {
        if (!userID) {
            setActiveLeaderboard(leaderboard.filter(user => user.rank < 7));
        } else if (userID && user.rank < 5) {
            setActiveLeaderboard(leaderboard.filter(user => user.rank < 7));
        } else {
            var ranks = rankMixer(userID);
            setActiveLeaderboard(ranks)}
            console.log('scenario 3: ', activeLeaderboard);
    }, [userID]);

    const thisLeaderboard = activeLeaderboard.length > 0 ? activeLeaderboard : leaderboard.filter(user => user.rank < 7);

    return (
        <div id="leaderboard_page" className="page leaderboard-page">
            <div className="leaderboard-container">
                <img src={crown} alt="crown" />
                <h3>Global Leaderboard</h3>
                {thisLeaderboard.map((user) => (
                    <CompRank key={user.user_id} data={user} />
                ))}
            </div>
        </div>
    );
}

export default PgLeaderboard;
