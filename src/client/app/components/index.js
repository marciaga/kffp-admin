import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar } from './navbar';
import Search from './search';
import { SearchResults } from './searchResults';
import { verifyLogin } from '../actions/loginActions';

const mapStateToProps = (state) => {
    return {
        searchResults: state.search.searchResults,
        isAuthenticated: state.login.isAuthenticated,
        errorMessage: state.login.errorMessage
    };
};

class App extends Component {
    constructor (props) {
        super(props);

        props.dispatch(verifyLogin(
            props.isAuthenticated
        ));
    }

    render () {
        const { dispatch, isAuthenticated, errorMessage, searchResults } = this.props;

        return (
            <div>
                <Navbar isAuthenticated={isAuthenticated} errorMessage={errorMessage} dispatch={dispatch} />
                {isAuthenticated &&
                    <div>
                        <Search dispatch={dispatch} />
                        <SearchResults
                            dispatch={dispatch}
                            searchResults={searchResults}
                        />
                    </div>
                }
            </div>
        )
    }
};

App.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(App);
