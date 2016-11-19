import React from 'react';

const SearchResult = ({ searchResult }) => {
    const { artist, track, album, images } = searchResult;
    const image = images.length > 0 ? images.pop() : { url: 'http://placehold.it/64x64' };

    return (
        <div>
            <h3>Artist: {artist}</h3>
            <h3>Track: {track}</h3>
            <h3>Album: {album}</h3>
            <img src={image.url} />
        </div>
    );
};

export { SearchResult };
