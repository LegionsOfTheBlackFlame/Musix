import React from 'react';

const CompPlayer = ({ songData }) => {
    return (
        <div className='media-player'>
        <audio controls autoPlay muted src={songData.url}>
            Your browser does not support the audio element.
        </audio>
    </div>
    );
};

export default CompPlayer;
