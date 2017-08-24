import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import AvPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import update from 'immutability-helper';
import cuid from 'cuid';
import ArrowButton from './arrowButton';
import SongFormWrapper from './songFormWrapper';
import {
    reorderSongsSave,
    addTrack,
    addAirBreak,
    reorderSongs
} from '../../actions/playlistActions';
import { generateBlankSongData } from '../../utils/helperFunctions';
import {
    NOW_PLAYING_ACTIVE,
    NOW_PLAYING_COLOR,
    NOW_PLAYING_PLAYED
} from '../../utils/constants';
import { setSongForm } from '../../actions/formActions';
import { updateNowPlaying } from '../../actions/nowPlayingActions';

class SongList extends Component {
    constructor (props) {
        super(props);

        this.moveSong = this.moveSong.bind(this);
        this.findSong = this.findSong.bind(this);
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
        const { currentPlaylist } = nextProps;
        const { songs } = currentPlaylist;

        this.props.dispatch(setSongForm(songs));
        this.state = { songs };
    }

    componentWillUpdate (nextProps, nextState) {
        const { songs } = nextState;

        this.props.dispatch(setSongForm(songs));
    }

    onSaveOrder () {
        const { songs, playlistId } = this.props.currentPlaylist;

        this.props.dispatch(reorderSongsSave(songs, playlistId));
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
        const { playlistId } = this.props.currentPlaylist;
        const blankSong = generateBlankSongData();

        this.setState(update(this.state, {
            songs: { $unshift: [blankSong] }
        }));

        this.props.dispatch(addTrack(blankSong, playlistId));
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

    findSong (id) {
        const { songs } = this.state;
        // TODO: This could return undefined
        const song = songs.filter(c => c.id === id)[0];

        return {
            song,
            index: songs.indexOf(song)
        };
    }

    moveSong (direction, id) {
        const songs = this.state.songs;
        const { song, index } = this.findSong(id);
        // don't shift up if song is first or down if song is last
        if ((!index && direction === 'up') ||
            (index === songs.length && direction === 'down')) {
            return;
        }

        const newIndex = direction === 'up' ? index - 1 : index + 1;

        this.setState(update(this.state, {
            songs: {
                $splice: [
                    [index, 1],
                    [newIndex, 0, song]
                ]
            }
        }));

        this.props.dispatch(reorderSongs({ id, index: newIndex }));
    }

    render () {
        const { songs } = this.state;
        const { nowPlaying, currentPlaylist } = this.props;
        const currentlyPlayingSong = nowPlaying.song;
        const { playlistId } = currentPlaylist;

        return (
            <div className="col col-md-12">
                <div className="col col-md-12 flex-horizontal-center">
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
                        // song: album, artist, title, releaseDate, id, images
                        const { id, airBreak } = song;
                        const nowPlayingVisibility = { visibility: !airBreak ? 'visible' : 'hidden' };

                        return (
                            <div
                                className="song-wrapper"
                                key={id || cuid()}
                            >
                                <ArrowButton
                                    direction="up"
                                    clickHandler={this.moveSong}
                                    id={id}
                                />
                                <ArrowButton
                                    direction="down"
                                    clickHandler={this.moveSong}
                                    id={id}
                                />

                                <SongFormWrapper
                                    index={i}
                                    findSong={this.findSong}
                                    playlistId={playlistId}
                                    {...song}
                                />
                                <IconButton
                                    style={nowPlayingVisibility}
                                    tooltip="Click to set as Now Playing"
                                    onClick={() => this.addToNowPlaying(song, playlistId)}
                                >
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

SongList.propTypes = {
    nowPlaying: PropTypes.object,
    currentPlaylist: PropTypes.object,
    dispatch: PropTypes.func
};

export default SongList;
