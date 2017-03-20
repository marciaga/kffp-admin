import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Search from '../search';
import SearchResults from '../search/searchResults';
import SongList from './songList';
import {
    updatePlaylistDate,
    deletePlaylist
} from '../../actions/playlistActions';

const mapStateToProps = state => ({
    auth: state.auth,
    show: state.show,
    playlist: state.playlist,
    search: state.search,
    nowPlaying: state.nowPlaying
});

const shouldShowCurrentPlaylist = obj => (obj ? Object.keys(obj).length > 1 : false);

const handleDeleteClick = (dispatch, playlistId, showSlug) => {
    if (!window.confirm('Are you sure you want to delete this playlist?')) {
        return false;
    }

    dispatch(deletePlaylist(playlistId, showSlug));
};

const handleDateChange = (u, { date, playlistId }, dispatch) =>
    dispatch(updatePlaylistDate(date, playlistId));

const PlaylistForm = (props) => {
    const { playlist, show, search, nowPlaying, dispatch } = props;
    const { currentPlaylist } = playlist;
    const { searchResults, currentSearch } = search;
    const { currentShow: { slug = '' } } = show;

    if (shouldShowCurrentPlaylist(currentPlaylist)) {
        const { playlistDate, playlistId } = currentPlaylist;
        const dateObj = moment.utc(playlistDate);
        const formattedDate = dateObj.format('MMMM Do, YYYY');

        return (
            <div className="playlist-wrapper row">
                <DatePicker
                    className="col col-md-12 flex-horizontal-center date-input"
                    id="playlist-date"
                    value={dateObj.toDate()}
                    formatDate={() => formattedDate}
                    onChange={(u, date) => handleDateChange(u, { date, playlistId }, dispatch)}
                />

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

                <div className="col col-md-12 flex-horizontal-center">
                    <RaisedButton
                        label="Delete Playlist"
                        labelColor="white"
                        backgroundColor="red"
                        onClick={() =>
                            handleDeleteClick(dispatch, playlistId, slug)
                        }
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="col col-md-12 flex-horizontal-center">
            <h2 className="h2">No Currently Selected Playlist</h2>
        </div>
    );
};

export default connect(mapStateToProps)(PlaylistForm);
