import React, { PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import SongForm from './songForm';
import { removeAirbreak } from '../../actions/playlistActions';

const AirBreakCard = ({ id, dispatch }) =>
    <Card>
        <CardText style={{ position: 'relative' }}>
            <h1
                style={{ display: 'inline-block' }}
            >
                Air Break
            </h1>
            <IconButton
                style={{
                    display: 'inline-block',
                    position: 'absolute',
                    top: 0,
                    right: 0
                }}
                onClick={() => dispatch(removeAirbreak(id))}
            >
                <ActionDelete />
            </IconButton>
        </CardText>
    </Card>
;

const generateHeading = ({ title, artist }) => {
    let str = title || 'Missing Title';

    str = artist ? `${str} by ${artist}` : str;

    return str;
};

const generateSubtitle = ({ album, releaseDate, label }) => {
    const subtitle = [];

    if (album) {
        subtitle.push('on ', album);
    }

    if (label) {
        subtitle.push(' - released by ', label);
    }

    if (releaseDate) {
        subtitle.push(' in ', releaseDate);
    }

    return subtitle.join(' ');
};

const SongCard = (props) => {
    const {
        album,
        artist,
        title,
        releaseDate,
        label,
        id,
        form,
        playlistId,
        dispatch
    } = props;

    const { songs } = form;
    const currentSong = songs.find(s => id === s.id);
    const heading = generateHeading({ artist, title });
    const subtitle = generateSubtitle({ album, releaseDate, label });

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

AirBreakCard.propTypes = {
    dispatch: PropTypes.func,
    id: PropTypes.string
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
