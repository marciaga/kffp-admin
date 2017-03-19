import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import Search from '../search';
import SearchResults from '../search/searchResults';
import SongList from './songList';
import { updatePlaylistDate } from '../../actions/playlistActions';

const mapStateToProps = state => ({
    auth: state.auth,
    show: state.show,
    playlist: state.playlist,
    search: state.search,
    nowPlaying: state.nowPlaying
});

const shouldShowCurrentPlaylist = obj => (obj ? Object.keys(obj).length > 1 : false);

const handleDateChange = (u, { date, playlistId }, dispatch) =>
    dispatch(updatePlaylistDate(date, playlistId));

const PlaylistForm = (props) => {
    const { playlist, search, nowPlaying, dispatch } = props;
    const { currentPlaylist } = playlist;
    const { searchResults, currentSearch } = search;

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
            </div>
        );
    }

    return (
        <div>
            {/* <h2 className="h2">No Currently Selected Playlist</h2> */}
        </div>
    );
};

export default connect(mapStateToProps)(PlaylistForm);
