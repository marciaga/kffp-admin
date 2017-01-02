import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

const SearchResults = ({ searchResults }) => {

    return (
        <div className="search-results">
            <GridList
              cellHeight={'auto'}
              cols={3}
              className="search-results__grid-wrapper"
            >
                {searchResults && searchResults.map((tile, i) => {
                    const { artist, track, album, images } = tile;
                    const image = images.length && images[1] ?
                        images[1] : { url: 'http://placehold.it/300x300' };

                    return (
                        <GridTile
                            key={i}
                            title={track}
                            subtitle={<span>by <b>{artist}</b></span>}
                            className="search-results__grid-tile"
                            onClick={() => console.log(tile)}
                        >
                        <img src={image.url} />
                        </GridTile>
                    )

                })}
            </GridList>
        </div>
    );
};

export { SearchResults };
