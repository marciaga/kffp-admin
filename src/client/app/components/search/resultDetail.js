import React, { PropTypes } from 'react';

const ResultDetail = ({artist, album, releaseDate}) => {


    return (
        <div><p>by <b>{artist}</b></p><p>on <b>{album}</b> released {releaseDate}</p></div>
    );
}

ResultDetail.propTypes = {
    artist: PropTypes.string,
    album: PropTypes.string,
    releaseDate: PropTypes.string
};

export default ResultDetail;