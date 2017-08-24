import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { navigateToPlaylists } from '../../actions/showActions';
import { resetCurrentPlaylist } from '../../actions/playlistActions';

const ShowSelect = ({ dispatch, userShows }) => {
    const renderItems = (list) => {
        if (list) {
            return list.map((item, i) => (
                <MenuItem
                    key={i}
                    value={item.slug}
                    primaryText={item.showName}
                />
            ));
        }
    };

    const selectChangeHandler = (event, index, value) => {
        // dispatch an action that navigates to the playlist page for that show id
        dispatch(resetCurrentPlaylist());
        dispatch(navigateToPlaylists(value));
    };

    return (
        <SelectField
            floatingLabelText={'My Shows'}
            onChange={selectChangeHandler}
        >
            { renderItems(userShows) }
        </SelectField>
    );
};

ShowSelect.propTypes = {
    dispatch: PropTypes.func,
    userShows: PropTypes.array
};

export default ShowSelect;
