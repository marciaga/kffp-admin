import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import RaisedButton from 'material-ui/RaisedButton';
import update from 'immutability-helper';
import cuid from 'cuid';
import SongFormWrapper from './songFormWrapper';
import {
    reorderSongsSave,
    addTrack,
    addAirBreak
} from '../../actions/playlistActions';
import { generateBlankSongData } from '../../utils/helperFunctions';
import { setSongForm } from '../../actions/formActions';

const style = {
    width: 400
};

class SongList extends Component {
    constructor (props) {
        super(props);

        this.moveSong = this.moveSong.bind(this);
        this.onSaveOrder = this.onSaveOrder.bind(this);
        this.addNewSong = this.addNewSong.bind(this);
        this.addAirBreak = this.addAirBreak.bind(this);
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

    addNewSong () {
        const { _id } = this.props.currentPlaylist;
        const blankSong = generateBlankSongData();

        this.setState(update(this.state, {
            songs: { $unshift: [blankSong] }
        }));

        this.props.dispatch(addTrack(blankSong, _id));
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

    render () {
        const { songs } = this.state;
        const { _id } = this.props.currentPlaylist;

        return (
            <div style={style}>
                <RaisedButton
                    type="button"
                    onClick={this.onSaveOrder}
                    label="Save Track Order"
                    backgroundColor="#3F51B5"
                    labelColor="#FFFFFF"
                />

                <RaisedButton
                    type="button"
                    label="Add New Track"
                    onClick={this.addNewSong}
                    backgroundColor="#8BC34A"
                    labelColor="#FFFFFF"
                />

                <RaisedButton
                    type="button"
                    label="Add Air Break"
                    onClick={this.addAirBreak}
                    backgroundColor="#FF9800"
                    labelColor="#FFFFFF"
                />

                {songs.map((song, i) => (
                    // song: album, artist, track, releaseDate, id, images
                    <SongFormWrapper
                        index={i}
                        key={song.id || cuid()}
                        moveSong={this.moveSong}
                        playlistId={_id}
                        {...song}
                    />
                ))}
            </div>
        );
    }
}
export default DragDropContext(HTML5Backend)(SongList);
