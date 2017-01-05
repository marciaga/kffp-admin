import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'react/lib/update';
import SongFormWrapper from './songFormWrapper';

const style = {
    width: 400
};

class SongList extends Component {
    constructor (props) {
        super(props);
        const { currentPlaylist } = props;
        const { songs } = currentPlaylist;

        this.moveSong = this.moveSong.bind(this);

        this.state = {
            songs
        };
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

        return (
            <div style={style}>
                {songs.map((song, i) => {
                    const {
                        album,
                        artist,
                        track,
                        releaseDate,
                        id,
                        images
                    } = song;

                    return (
                        <SongFormWrapper
                            index={i}
                            key={id}
                            moveSong={this.moveSong}
                            {...song}
                        />
                    );
                })}
            </div>
        );
    }
}
export default DragDropContext(HTML5Backend)(SongList);
