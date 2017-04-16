import React, { PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { SHOWS_AUTOCOMPLETE_FILTER_LIMIT } from '../../../utils/constants';
import { navigateToPlaylists } from '../../../actions/showActions';
import { resetCurrentPlaylist } from '../../../actions/playlistActions';

const dataSourceConfig = {
    text: 'showName',
    value: 'slug'
};

const ShowsAutoCompleteFilter = ({ dispatch, shows }) => {
    const showData = shows.map(s => ({
        showName: s.showName,
        slug: s.slug
    }));

    const handleSelection = (req) => {
        const { slug } = req;

        dispatch(resetCurrentPlaylist());
        dispatch(navigateToPlaylists(slug));
    };

    return (
        <AutoComplete
            floatingLabelText="Sub Playlist"
            filter={AutoComplete.fuzzyFilter}
            dataSource={showData}
            dataSourceConfig={dataSourceConfig}
            maxSearchResults={SHOWS_AUTOCOMPLETE_FILTER_LIMIT}
            onNewRequest={handleSelection}
        />
    );
};

ShowsAutoCompleteFilter.propTypes = {
    dispatch: PropTypes.func,
    shows: PropTypes.array
};

export default ShowsAutoCompleteFilter;
