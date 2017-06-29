import React from 'react';
import { connect } from 'react-redux';
import SongCard from './songCard';

const mapStateToProps = state => ({
    form: state.form
});

const style = {
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white'
};

const SongFormWrapper = props => (
    <div
        className="song-item"
        style={{ ...style }}
    >
        <SongCard {...props} />
    </div>
);

export default connect(mapStateToProps)(SongFormWrapper);
