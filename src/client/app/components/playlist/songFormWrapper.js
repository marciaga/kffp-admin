import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import SongCard from './songCard';
import { reorderSongs } from '../../actions/playlistActions';

const mapStateToProps = state => ({
    form: state.form
});

const style = {
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move'
};

const songSource = {
    beginDrag (props) {
        return {
            id: props.id,
            index: props.index
        };
    },
    endDrag (props, monitor) {
        const { id, index } = monitor.getDropResult();

        props.dispatch(reorderSongs({ id, index }));
    }
};

const songTarget = {
    drop (props, monitor) {
        return monitor.getItem();
    },
    hover (props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveSong(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

const type = {
    SONG: 'song'
};

const collectDragSource = (dndConnect, monitor) => ({
    connectDragSource: dndConnect.dragSource(),
    isDragging: monitor.isDragging()
});

const collectDropTarget = dndConnect => ({
    connectDropTarget: dndConnect.dropTarget()
});

class SongFormWrapper extends Component {
    render () {
        const {
            isDragging,
            connectDragSource,
            connectDropTarget
        } = this.props;

        const opacity = isDragging ? 0 : 1;

        return connectDragSource(connectDropTarget(
            <div
                className="song-item"
                style={{ ...style, opacity }}
            >
                <SongCard {...this.props} />
            </div>
        ));
    }
}

SongFormWrapper = DropTarget(type.SONG, songTarget, collectDropTarget)(SongFormWrapper);
export default compose(connect(mapStateToProps),
    DragSource(type.SONG, songSource, collectDragSource))(SongFormWrapper);
