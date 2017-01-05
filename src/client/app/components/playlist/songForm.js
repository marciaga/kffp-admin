import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {

    };
};

class SongForm extends Component {

    render () {
        return (
            <div>
                <h1>I'm the form!</h1>
            </div>
        );
    }
}

export default connect(mapStateToProps)(SongForm);
