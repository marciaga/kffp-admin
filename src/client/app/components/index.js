import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Search from './search';
import { SearchResults } from './searchResults';

const mapStateToProps = (state) => {
    return {
        searchResults: state.search.searchResults
    };
};

class App extends Component {
    render() {
        const { dispatch, searchResults } = this.props;

        return (
            <div>
                <Search dispatch={dispatch} />
                <SearchResults
                    dispatch={dispatch}
                    searchResults={searchResults}
                />
            </div>
        )
    }
};

App.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(App);
