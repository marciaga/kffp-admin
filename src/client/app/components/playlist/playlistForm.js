import React from 'react';
import { connect } from 'react-redux';
import Search from '../search';
import SearchResults from '../search/searchResults';
import SongList from './songList';

const mapStateToProps = state => ({
    auth: state.auth,
    show: state.show,
    playlist: state.playlist,
    search: state.search,
    nowPlaying: state.nowPlaying
});

const PlaylistForm = (props) => {
    const { playlist, search, nowPlaying, dispatch } = props;
    const { currentPlaylist } = playlist;
    const { searchResults, currentSearch } = search;
    {/* should be: show the search if flagged to do so */}
    if (currentPlaylist) {
        return (
            <div className="playlist-wrapper row">
                <h2>{currentPlaylist.dateSlug}</h2>
                <Search />
                {!!searchResults.length &&
                    <SearchResults
                        searchResults={searchResults}
                        playlistId={currentPlaylist._id}
                        dispatch={dispatch}
                    />
                }
                {!searchResults.length &&
                    <SongList
                        currentPlaylist={currentPlaylist}
                        currentSearch={currentSearch}
                        nowPlaying={nowPlaying}
                        dispatch={dispatch}
                    />
                }
            </div>
        );
    }

    return (
        <div>
            {/*<h2 className="h2">No Currently Selected Playlist</h2>*/}
        </div>
    );
};

export default connect(mapStateToProps)(PlaylistForm);
