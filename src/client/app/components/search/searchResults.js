import React, { PropTypes } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import { addTrack, clearSearchResults } from '../../actions/playlistActions';

const SearchResults = ({ searchResults, playlistId, dispatch }) => {
    const handleClick = (track, pId) => {
        dispatch(addTrack(track, pId));
    };

    return (
        <div
            className="search-results col col-md-12"
            style={{ margin: '15px auto' }}
        >
            <div style={{ textAlign: 'center' }}>
                <RaisedButton
                    onClick={() => dispatch(clearSearchResults())}
                    label="Close Results"
                    primary={true}
                    className="playlist-action__button"
                />
            </div>

            <GridList
                cellHeight={200}
                cols={4}
                className="search-results__grid-wrapper"
            >
                {searchResults && searchResults.map((tile, i) => {
                    const { artist, title, album, images } = tile;
                    const image = images.length && images[1] ?
                        images[1] : { url: 'http://placehold.it/300x300' };

                    return (
                        <GridTile
                            key={i}
                            title={title}
                            subtitle={<span>by <b>{artist}</b></span>}
                            className="search-results__grid-tile"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleClick(tile, playlistId)}
                        >
                            <img src={image.url} alt={album} />
                        </GridTile>
                    );
                })}
            </GridList>
        </div>
    );
};

SearchResults.propTypes = {
    searchResults: PropTypes.array,
    playlistId: PropTypes.string,
    dispatch: PropTypes.func
};

export default SearchResults;
