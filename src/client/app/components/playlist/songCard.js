import React, { PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import SongForm from './songForm';

const AirBreakCard = () =>
    <Card>
        <CardText>
            <h1>Air Break</h1>
        </CardText>
    </Card>
;

const SongCard = (props) => {
    const {
        album,
        artist,
        track,
        releaseDate,
        id,
        form,
        playlistId,
        dispatch
    } = props;

    const { songs } = form;
    const currentSong = songs.find(s => id === s.id);
    const title = `${track} by ${artist}`;
    const subtitle = `on ${album} - released ${releaseDate}`;

    if (props.airBreak) {
        return (
            <AirBreakCard {...props} />
        );
    }

    return (
        <Card>
            <CardHeader
                title={title}
                subtitle={subtitle}
                actAsExpander={true}
                showExpandableButton={true}
            />
            <CardText expandable={true}>
                <SongForm
                    currentSong={currentSong}
                    playlistId={playlistId}
                    id={id}
                    dispatch={dispatch}
                />
            </CardText>
        </Card>
    );
};

SongCard.propTypes = {
    album: PropTypes.string,
    airBreak: PropTypes.string,
    artist: PropTypes.string,
    track: PropTypes.string,
    releaseDate: PropTypes.string,
    id: PropTypes.string,
    form: PropTypes.object,
    playlistId: PropTypes.string,
    dispatch: PropTypes.func
};

export default SongCard;
