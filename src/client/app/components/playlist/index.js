import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Search from '../search';
import { SearchResults } from '../search/searchResults';

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        search: state.search
    };
};

class Playlist extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { dispatch, search, auth } = this.props;
        const { searchResults } = search;

        return (
            <div>
                <h1>playlist component</h1>
                <Search dispatch={dispatch} />
                <SearchResults
                    dispatch={dispatch}
                    searchResults={searchResults}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Playlist);
