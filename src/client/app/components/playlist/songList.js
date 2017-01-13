import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';
import RaisedButton from 'material-ui/RaisedButton';
import SongFormWrapper from './songFormWrapper';
import { reorderSongsSave } from '../../actions/playlistActions';

const style = {
    width: 400
};

class SongList extends Component {
    constructor (props) {
        super(props);
        const { currentPlaylist } = props;
        const { songs } = currentPlaylist;

        this.moveSong = this.moveSong.bind(this);
        this.onSaveOrder = this.onSaveOrder.bind(this);

        this.state = {
            songs
        };
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

    render () {
        const { songs } = this.state;
        const { _id } = this.props.currentPlaylist;

        return (
            <div style={style}>
                <RaisedButton
                    type="button"
                    label="Save Track Order"
                    onClick={this.onSaveOrder}
                    primary={true}
                />

                {songs.map((song, i) => (
                    // song: album, artist, track, releaseDate, id, images
                    <SongFormWrapper
                        index={i}
                        key={song.id}
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
