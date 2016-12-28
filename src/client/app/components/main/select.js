import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { navigateToPlaylists } from '../../actions/showActions';

const ShowSelect = ({ dispatch, shows }) => {
    const renderItems = (list) => {
        if (list) {
            return list.map((item, i) => {
                return (
                    <MenuItem key={i} value={item.slug} primaryText={item.showName} />
                );
            });
        }
    };

    const selectChangeHandler = (event, index, value) => {
        // dispatch an action that navigates to the playlist page for that show id
        dispatch(navigateToPlaylists(value));
    };

    return (
        <SelectField
            floatingLabelText={'Select a Show'}
            onChange={selectChangeHandler}
        >
            { renderItems(shows) }
        </SelectField>
    );
};

export default ShowSelect;
