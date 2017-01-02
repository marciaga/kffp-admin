import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../search';
import { SearchResults } from '../search/searchResults';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        show: state.show,
        playlist: state.playlist,
        search: state.search
    };
};

class PlaylistForm extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { playlist, search } = this.props;
        const { currentPlaylist } = playlist;
        const { searchResults } = search;

        if (currentPlaylist) {
            return (
                <div>
                    <h2>{currentPlaylist.dateSlug}</h2>
                    <Search />
                    <SearchResults searchResults={searchResults}/>
                </div>
            );
        }

        return (
            <div>
                <h2 className="h2">No Currently Selected Playlist</h2>
            </div>
        )
    }
}

export default connect(mapStateToProps)(PlaylistForm);
