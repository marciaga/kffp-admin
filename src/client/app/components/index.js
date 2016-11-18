import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Search from './search';

const mapStateToProps = (state) => {
    return {};
};

class App extends Component {
    render() {
        const {dispatch} = this.props;

        return (
            <div>
                <Search dispatch={dispatch} />
            </div>
        )
    }
};

App.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(App);
