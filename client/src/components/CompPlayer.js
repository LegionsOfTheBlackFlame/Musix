import React from 'react';

const CompPlayer = ({ songData }) => {
    return (
        <div>
        <h2>{songData.song_name} by {songData.artist_name}</h2>
        <audio controls autoPlay muted src={songData.url}>
            Your browser does not support the audio element.
        </audio>
    </div>
    );
};

export default CompPlayer;
