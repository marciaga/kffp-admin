import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import AvPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import update from 'immutability-helper';
import cuid from 'cuid';
import SongFormWrapper from './songFormWrapper';
import {
    reorderSongsSave,
    addTrack,
    addAirBreak
} from '../../actions/playlistActions';
import { generateBlankSongData } from '../../utils/helperFunctions';
import {
    NOW_PLAYING_ACTIVE,
    NOW_PLAYING_COLOR,
    NOW_PLAYING_PLAYED
} from '../../utils/constants';
import { setSongForm } from '../../actions/formActions';
import { updateNowPlaying } from '../../actions/nowPlayingActions';

const style = {
    width: 500
};

class SongList extends Component {
    constructor (props) {
        super(props);

        this.moveSong = this.moveSong.bind(this);
        this.onSaveOrder = this.onSaveOrder.bind(this);
        this.addNewSong = this.addNewSong.bind(this);
        this.addAirBreak = this.addAirBreak.bind(this);
        this.addToNowPlaying = this.addToNowPlaying.bind(this);
        this.setNowPlayingColor = this.setNowPlayingColor.bind(this);
    }

    componentWillMount () {
        const { dispatch, currentPlaylist } = this.props;

        dispatch(setSongForm(currentPlaylist.songs));

        this.state = {
            songs: currentPlaylist.songs
        };
    }

    componentWillReceiveProps (nextProps) {
        const previousSearch = this.props.currentSearch;
        const { currentSearch, currentPlaylist } = nextProps;
        const { songs } = currentPlaylist;

        if (previousSearch.length !== currentSearch.length) {
            return;
        }

        this.props.dispatch(setSongForm(songs));
        this.state = { songs };
    }

    onSaveOrder () {
        const { songs, _id } = this.props.currentPlaylist;

        this.props.dispatch(reorderSongsSave(songs, _id));
    }

    setNowPlayingColor (currentSongId, song) {
        if (currentSongId === song.id) {
            return NOW_PLAYING_ACTIVE;
        }

        if (song.playedAt) {
            return NOW_PLAYING_PLAYED;
        }

        return NOW_PLAYING_COLOR;
    }

    addNewSong () {
        const { _id } = this.props.currentPlaylist;
        const blankSong = generateBlankSongData();

        this.setState(update(this.state, {
            songs: { $unshift: [blankSong] }
        }));

        this.props.dispatch(addTrack(blankSong, _id));
    }

    addToNowPlaying (song, playlistId) {
        this.props.dispatch(updateNowPlaying({ song, playlistId }));
    }

    addAirBreak () {
        const airBreak = {
            airBreak: true,
            id: cuid()
        };

        this.setState(update(this.state, {
            songs: { $unshift: [airBreak] }
        }));

        this.props.dispatch(addAirBreak(airBreak));
    }

    moveSong (dragIndex, hoverIndex) {
        const { songs } = this.state;
        const dragSong = songs[dragIndex];

        this.setState(update(this.state, {
            songs: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragSong]
                ]
            }
        }));
    }

    render () {
        const { songs } = this.state;
        const { nowPlaying, currentPlaylist } = this.props;
        const currentlyPlayingSong = nowPlaying.song;
        const { _id } = currentPlaylist;

        return (
            <div className="col col-md-12">
                <div
                    className="col col-md-12 flex-horizontal-center"
                    style={{}}
                >
                    <RaisedButton
                        type="button"
                        label="Add New Track"
                        onClick={this.addNewSong}
                        backgroundColor="#111111"
                        labelColor="#FFFFFF"
                        className="playlist-action__button"
                    />

                    <RaisedButton
                        type="button"
                        onClick={this.onSaveOrder}
                        label="Save Track Order"
                        backgroundColor="#111111"
                        labelColor="#FFFFFF"
                        className="playlist-action__button"
                    />

                    <RaisedButton
                        type="button"
                        label="Add Air Break"
                        onClick={this.addAirBreak}
                        backgroundColor="#111111"
                        labelColor="#FFFFFF"
                        className="playlist-action__button"
                    />
                </div>
                <div className="col col-md-12">
                    {songs.map((song, i) => {
                        const nowPlayingColor = this.setNowPlayingColor(
                            currentlyPlayingSong.songId, song
                        );
                        // song: album, artist, track, releaseDate, id, images
                        return (
                            <div
                                className="song-wrapper"
                                key={song.id || cuid()}
                            >
                                <SongFormWrapper
                                    index={i}
                                    moveSong={this.moveSong}
                                    playlistId={_id}
                                    {...song}
                                />
                                <IconButton onClick={() => this.addToNowPlaying(song, _id)}>
                                    <AvPlayCircleFilled color={nowPlayingColor} />
                                </IconButton>
                            </div>
                        );
                    })}

                </div>
            </div>
        );
    }
}
export default DragDropContext(HTML5Backend)(SongList);
