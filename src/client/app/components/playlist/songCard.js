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

const generateHeading = ({ title, artist }) => {
    let str = title || 'Missing Title';

    str = artist ? `${str} by ${artist}` : str;

    return str;
};

const generateSubtitle = ({ album, releaseYear }) => {
    const subtitle = [];

    if (album) {
        subtitle.push('on ', album);
    }

    if (releaseYear) {
        subtitle.push(' - released ', releaseYear);
    }

    return subtitle.join(' ');
};

const SongCard = (props) => {
    const {
        album,
        artist,
        title,
        releaseYear,
        id,
        form,
        playlistId,
        dispatch
    } = props;

    const { songs } = form;
    const currentSong = songs.find(s => id === s.id);
    const heading = generateHeading({ artist, title });
    const subtitle = generateSubtitle({ album, releaseYear });

    if (props.airBreak) {
        return (
            <AirBreakCard {...props} />
        );
    }

    return (
        <Card>
            <CardHeader
                title={heading}
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
    airBreak: PropTypes.bool,
    artist: PropTypes.string,
    title: PropTypes.string,
    releaseYear: PropTypes.string,
    id: PropTypes.string,
    form: PropTypes.object,
    playlistId: PropTypes.string,
    dispatch: PropTypes.func
};

export default SongCard;
