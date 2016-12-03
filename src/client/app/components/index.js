import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar } from './navbar';
import Search from './search';
import { SearchResults } from './searchResults';
import { verifyLogin } from '../actions/authActions';

const mapStateToProps = (state) => {
    return {
        search: state.search,
        auth: state.auth
    };
};

class App extends Component {
    constructor (props) {
        super(props);

        props.dispatch(verifyLogin(
            props.auth.isAuthenticated
        ));
    }

    render () {
        const { dispatch, search, auth } = this.props;
        const { searchResults } = search;
        const { isAuthenticated, errorMessage } = auth;

        return (
            <div>
                <Navbar isAuthenticated={isAuthenticated} errorMessage={errorMessage} dispatch={dispatch} />
                {isAuthenticated &&
                    <div>
                        {this.props.children}
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
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(App);
