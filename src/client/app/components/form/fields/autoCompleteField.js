import React, { Component } from 'react';
import Album from 'material-ui/svg-icons/av/album';
import AutoComplete from 'material-ui/AutoComplete';
import { List, ListItem } from 'material-ui/List';

import MenuItem from 'material-ui/MenuItem';
import { getUserAutoComplete, addUsersToShow } from '../../actions/formActions';
import { FORM_FIELD_DEBOUNCE_TIME } from '../../utils/constants';
import { debounce } from '../../utils/helperFunctions';



export default class AutoCompleteField extends Component {
    constructor (props) {
        super(props);

        this.debounceInputField = debounce(this.debounceInputField, FORM_FIELD_DEBOUNCE_TIME);
        this.handleSelection = this.handleSelection.bind(this);
        this.handleInputUpdate = this.handleInputUpdate.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.renderAutocompleteItems = this.renderAutocompleteItems.bind(this);
    }

    debounceInputField (value) {
        this.props.dispatch(getUserAutoComplete(value));
    }

    handleInputUpdate (text) {
        this.debounceInputField(text);
    }

    handleSelection (selected) {
        if (selected) {
            this.props.dispatch(addUsersToShow(selected.text));
        }
    }

    renderAutocompleteItems (results) {
        if (!results) {
            return [];
        }

        return results.map((r) => {
            const itemText = `${r.displayName} | ${r.email}`;

            return {
                text: r.displayName,
                value: (
                    <MenuItem primaryText={itemText} />
                )
            };
        });
    }

    renderListItems (items) {
        if (!items) {
            return [];
        }

        return items.map((item, i) => (
            <ListItem
                key={i}
                primaryText={item}
                leftIcon={<Album />}
            />
        ));
    }

    render () {
        const { hintText, label, searchResults, value } = this.props;
        const dataSource = this.renderAutocompleteItems(searchResults);

        return (
            <div>
                <div>
                    <AutoComplete
                        hintText={hintText}
                        dataSource={dataSource}
                        filter={AutoComplete.noFilter}
                        onNewRequest={this.handleSelection}
                        onUpdateInput={this.handleInputUpdate}
                        floatingLabelText={label}
                        fullWidth={true}
                    />
                </div>
                <div>
                    <p style={{ marginBottom: 0 }}>DJ(s) Assigned to This Show:</p>
                    <List>
                        {this.renderListItems(value)}
                    </List>
                </div>
            </div>
        );
    }
}
