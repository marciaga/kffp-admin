import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import SongForm from './songForm';

const SongCard = (props) => {
    const {
        album,
        artist,
        track,
        releaseDate
        // id, TODO use these?
        // images
    } = props;

    const title = `${track} by ${artist}`;
    const subtitle = `on ${album} - released ${releaseDate}`;

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
                {...props}    
                />
            </CardText>
        </Card>
    );
};

export default SongCard;
