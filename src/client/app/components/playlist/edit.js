import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../search';
import SearchResults from '../search/searchResults';
import SongList from './songList';

const mapStateToProps = state => ({
    auth: state.auth,
    show: state.show,
    playlist: state.playlist,
    search: state.search
});

class PlaylistForm extends Component {
    render () {
        const { playlist, search, dispatch } = this.props;
        const { currentPlaylist } = playlist;
        const { searchResults } = search;

        if (currentPlaylist) {
            return (
                <div className="playlist-wrapper">
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
                            dispatch={dispatch}
                        />
                    }
                </div>
            );
        }

        return (
            <div>
                <h2 className="h2">No Currently Selected Playlist</h2>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PlaylistForm);
