import React, { PropTypes } from 'react';

const ResultDetail = ({ artist, album, releaseDate }) => {
    const boldStyle = {
        fontWeight: 'bold'
    };

    return (
        <div>
            <p>
                by&nbsp;
                <span style={boldStyle}>{artist}</span>
            </p>
            <p>
                on&nbsp;
                <span style={boldStyle}>{album}</span>
                &nbsp;released&nbsp;{releaseDate}
            </p>
        </div>
    );
};

ResultDetail.propTypes = {
    artist: PropTypes.string,
    album: PropTypes.string,
    releaseDate: PropTypes.string
};

export default ResultDetail;
